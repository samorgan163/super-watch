import styles from './Input.module.css';

export default function Input({ref, leftIcon, rightIcon, ...props}) {

    return (

        <div className={styles.wrapper}>

            {leftIcon && (
                <div className={`${styles.iconContainer} ${styles.leftIcon}`}>
                    {leftIcon}
                </div>
            )}

            {rightIcon && (
                <div className={`${styles.iconContainer} ${styles.rightIcon}`}>
                    {rightIcon}
                </div>
            )}

            <input 
                className={`
                    ${styles.input}
                    ${leftIcon ? styles.hasLeftIcon : ''}
                    ${rightIcon ? styles.hasRightIcon : ''}
                `}
                ref={ref}
                {...props}
            />

        </div>

    );

}
