const validationPlugin = {
  install (Vue) {
    Vue.mixin({
      data()
      {
        return{
          errors : {},
          valid:true,
        }
      },
      watch:{
        errors()
        {
          if(!Object.keys(this.errors).length)
          {
            this.valid=true
          }else
          {
            this.valid=false
          }
        },
      },
      methods: {
         $v () {
          const schema = this.$options.validations
          console.log('schema',schema)
          if (schema) {
            Object.keys(schema).forEach( key => {
              const value = this[key]
              if(schema[key].validate)
              {
                const result=this[schema[key].validate](key,value)
                if(result && schema[key].customValidation.fun)
                {
                  this.validateFun(schema,key,value)
                }
              }else{
                this.validateFun(schema,key,value)
            }
            })
          }
        },
        validateFun(schema,key,value)
        {
          const validateFn = schema[key].customValidation.fun
          const result = validateFn(value)

         if (!result) {
           this.setError(key,schema[key].customValidation.message(key, value))
         }
        },
        setError(key,msg)
        {
          this.errors={
            ...this.errors,
            [key] : msg
          }
        },
        $onChange(key)
        {
          delete this.errors[key]
          if(!Object.keys(this.errors).length)
          {
            this.valid=true
          }
        },
        required(key, value)
        {
          if(value.trim()==='')
          {
            const msg= `${key} field is required`
            this.setError(key,msg)
            return false
          }
          return true
        }
      },
    })
  }
}
export default validationPlugin
