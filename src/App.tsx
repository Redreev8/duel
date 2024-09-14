import Pole from './components/pole'
import Counter from './UI/counter'
import SettingHerro from './components/setting-herro'
import useSettingHerro from './components/setting-herro/useSettingHerro'

function App() {
	const leftSetting = useSettingHerro({ speed: 6, frequencyFiring: 6 })
	const rightSetting = useSettingHerro({ speed: 6, frequencyFiring: 6 })

	return (
		<div  className='container'>
			<Counter>
				<Pole 
					leftSetting={ leftSetting.setting }
					rightSetting={ rightSetting.setting }
				/>
				<div className='row'>
					<SettingHerro 
						ref={ leftSetting.refInputs }
						onSpeead={ leftSetting.onSpeead }
						onFrequencyFiring={ leftSetting.onFrequencyFiring }
						title='Настройка лувого героя'
					/>
					<SettingHerro 
						ref={ rightSetting.refInputs }
						onSpeead={ rightSetting.onSpeead }
						onFrequencyFiring={ rightSetting.onFrequencyFiring }
						title='Настройка правого героя'
					/>
				</div>
			</Counter>
		</div>
	)
}

export default App
