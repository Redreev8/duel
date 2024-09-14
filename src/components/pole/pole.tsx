import { FC } from 'react'
import Canvas from '../../UI/canvas'
import usePole from './usePole'
import { SettingHerro } from '../setting-herro/useSettingHerro'
export interface PoleProps {
	leftSetting: SettingHerro
	rightSetting: SettingHerro
}

const Pole: FC<PoleProps> = ({ leftSetting, rightSetting }) => {
	const { draw, refCnavas, handelMouseMove } = usePole({ leftSetting, rightSetting })
	return (
		<div className='block'>
			<Canvas
				draw={draw}
				onMouseMove={ handelMouseMove }
				ref={ refCnavas }
				width={1180} 
				height={580} 
			>
			</Canvas>
		</div>
	)
}

export default Pole