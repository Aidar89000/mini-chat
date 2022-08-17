import { useEffect } from 'react'
import classes from './Input.module.css'

const Input = props => {

    let cls = 'input'

    if (props.passwordError)
        if (!props.passwordError.isTrue){
            cls = 'error'
        }
    
    if (props.emailError)
        if (!props.emailError.isTrue){
            cls = 'error'
    }

    if (props.smallTextError)
        if (!props.smallTextError.isTrue){
            cls = 'error'
    }

    return (
     
    <div className={classes['input-container']}>

            <label className={props.labelClassName?classes[props.labelClassName]:classes['label-text']}> 
                <input value={props.value} type={props.type} className={props.className?classes[props.className]:classes[cls]} placeholder={props.children} onChange={props.onChange} />
            </label> 
        
        {props.passwordError ? !props.passwordError.isTrue ? <p className={classes['error-text']}>{props.passwordError.text}</p>
        : null: null}

        {props.emailError ? !props.emailError.isTrue ? <p className={classes['error-text']}>{props.emailError.text}</p>
                : null: null}
        
        {props.smallTextError ? !props.smallTextError.isTrue ? <p className={classes['error-text']}>{props.smallTextError.text}</p>
                : null: null}

    </div>

    )

}

export {Input}