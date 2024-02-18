import React, { useState, useEffect } from 'react'

//Icons
import { XMarkIcon, SunIcon, MoonIcon, SwatchIcon } from '@heroicons/react/24/solid'

//styles
import styles from './ThemeSwitcher.module.css'

//Custom hooks
import useLocalStorage from '../hooks/useLocalStorage'

const ThemeSwitcher = () => {
    
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    
    const [theme, setTheme] = useLocalStorage('react-todo.theme', defaultDark ? 'dark' : 'light')
    const [isColorPicking, setIsColorPicking] = useState(false)
    const [hue, setHue] = useLocalStorage('react-todo.color', '240')

    useEffect(() => {
        //documentElement --> Just like a HTML
       document.documentElement.setAttribute('color-scheme', theme)
    }, [theme])

    useEffect(() => {
       document.documentElement.style.setProperty('--_hue', hue)
    }, [hue])

    return (
        <aside
            className={styles.wrapper}
            style={{
                backgroundColor: isColorPicking ?
                    'hsl(var(--muted))' :
                    'transparent'
            }}
        >
            {
                isColorPicking ?
                    (<>
                        <button
                            className={`btn ${styles.close}`}
                            aria-label='Close color picking mode'
                            onClick={() => setIsColorPicking(false)}
                        >
                            <XMarkIcon/>
                        </button>
                        <input
                            className={styles.picker}
                            type="range"
                            min={0}
                            max={360}
                            aria-label='Change color theme slider'
                            value={hue}
                            onInput={(e) => setHue(e.target.value)}
                        />
                    </>) :
                    (<div
                        className={styles.btns}
                    >
                        <button
                            className='btn'
                            aria-label={`Change theme to ${theme === 'light' ? 'dark' : 'light'}`}
                            role='switch'
                            onClick={() => setTheme(theme === 'light'? 'dark' : 'light')}
                        >
                            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                        </button>
                        <button
                            className='btn'
                            aria-label='Enable color picking mode'
                            onClick={() => setIsColorPicking(true)}
                        >
                            <SwatchIcon />
                        </button>
                    </div>)
            }
        </aside>
    )
}

export default ThemeSwitcher