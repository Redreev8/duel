import { RefObject, useEffect } from 'react'
import { generationAtace } from './figure/atace'
import { SettingHerro } from '../setting-herro/useSettingHerro'
import { HerroSetting } from './figure/heros'

interface Props {
    setting: SettingHerro
    ref: RefObject<HerroSetting>
    refCnavas: RefObject<HTMLCanvasElement>
    isRevers: boolean
    startX: number
}

const useAtaceGenerate = ({ setting, ref, isRevers, refCnavas, startX }: Props) => {
    useEffect(() => {
        const interval = setInterval(() => {
            generationAtace({ 
                ataces: ref!.current!.ataces, 
                point: {
                    start: {
                        x: startX,
                        y: ref!.current!.position.y
                    },
                    end: {
                        x: isRevers ? 0 : refCnavas.current!.clientWidth,
                        y: ref!.current!.position.y
                    }, 
                },
            })
        }, 100 * setting.frequencyFiring)
        return () => {
            clearInterval(interval)
        }
    }, [setting.frequencyFiring])
    return 
}

export default useAtaceGenerate