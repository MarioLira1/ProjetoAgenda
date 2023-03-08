import validator from "validator";

export default class Login{
    constructor(formClass){
        this.fomr=document.querySelector(formClass)
    }
    init(){
        this.events()
    }
    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e =>{
            e.preventDefault();
            this.validate(e)
        })
    }
    validate(e){
        const el=e.target; 
        const emailinput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]') 
        let error = false;

        if(!validator.isEmail(emailinput.value)) {
            alert('email invaido');
            error = true;
        }

        if(passwordInput.value.length < 8 || passwordInput.value.length > 50){
        alert('SENHA PRECISA TER ENTRE 3 E 50')
        error = true
    }
    if(!error) el.submit();
    }


}
   