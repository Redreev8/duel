import { ChangeEvent, forwardRef } from 'react'

export interface SettingHerroProps {
    title: string
    onSpeead: (e: ChangeEvent<HTMLInputElement>) => void
    onFrequencyFiring: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface RefSettingHerro {
    speed: HTMLInputElement | null
    frequencyFiring: HTMLInputElement | null
}

const SettingHerro = forwardRef<RefSettingHerro, SettingHerroProps>(({ title, onSpeead, onFrequencyFiring }, ref) => {
  return (
    <div className='setting-herro'>
        <h3>{ title }</h3>
        <label className='label'>
            <span className='label__title'>Скорость</span>
            <input 
                className='label__input' type="range" 
                min={1} max={10} onChange={ onSpeead }
                ref={ node => {
                    if (!node && !ref ) return
                    if (typeof ref === 'function') return
                    ref!.current!.speed = node
                } }
            />
        </label>
        <label className='label'>
            <span className='label__title'>Частота выстрела</span>
            <input 
                className='label__input' type="range" 
                min={1} max={10} onChange={ onFrequencyFiring }
                ref={ node => {
                    if (!node && !ref ) return
                    if (typeof ref === 'function') return
                    ref!.current!.frequencyFiring = node
                } }
            />
        </label>
    </div>
  )
})

export default SettingHerro