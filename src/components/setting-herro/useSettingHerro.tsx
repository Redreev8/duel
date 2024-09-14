import { ChangeEvent, LegacyRef, useEffect, useRef } from 'react'
import { RefSettingHerro, SettingHerroProps } from './setting-herro'

export interface SettingHerro {
    speed: number
    frequencyFiring: number
}

export interface ReturnUseSettingHerro extends Omit<SettingHerroProps, 'title'> {
    setting: SettingHerro 
    refInputs: LegacyRef<RefSettingHerro>
}

const useSettingHerro = (setting: SettingHerro) : ReturnUseSettingHerro => {
	const refSetting = useRef<SettingHerro>(setting)
	const refInputs = useRef<RefSettingHerro>({ speed: null, frequencyFiring: null })
    const onSpeead = (e: ChangeEvent<HTMLInputElement>) => {
        refSetting.current.speed = +e.target.value
    }
    const onFrequencyFiring = (e: ChangeEvent<HTMLInputElement>) => {
        refSetting.current.frequencyFiring = +e.target.value
    }

	useEffect(() => {
		if (refInputs.current) {
			if (!refInputs.current.speed || !refInputs.current.frequencyFiring) return
			refInputs.current.speed.value = `${refSetting.current.speed}`
			refInputs.current.frequencyFiring.value = `${refSetting.current.frequencyFiring}`
		}
	}, [])

    return { setting: refSetting.current, refInputs, onSpeead, onFrequencyFiring }
}

export default useSettingHerro