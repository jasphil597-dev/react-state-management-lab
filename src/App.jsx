import './App.css';
import { useState, useEffect } from 'react';

const App = () => {
	// State variables
	const [team, setTeam] = useState([]);
	const [money, setMoney] = useState(100);
	const [totalStrength, setTotalStrength] = useState(0);
	const [totalAgility, setTotalAgility] = useState(0);

	// Define fighters' data
	const zombieFighters = [
		{
			name: 'Survivor',
			price: 12,
			strength: 6,
			agility: 4,
			img: '/public/survivor1.jpeg',
		},
		{
			name: 'Scavenger',
			price: 10,
			strength: 5,
			agility: 5,
			img: '/public/scavenger.jpeg',
		},
		{
			name: 'Shadow',
			price: 18,
			strength: 7,
			agility: 8,
			img: '/public/shadow.jpeg',
		},
		{
			name: 'Tracker',
			price: 14,
			strength: 7,
			agility: 6,
			img: 'https://via.placeholder.com/150/d32776',
		},
		{
			name: 'Sharpshooter',
			price: 20,
			strength: 6,
			agility: 8,
			img: '/public/sharpshooter.jpeg',
		},

		{
			name: 'Medic',
			price: 15,
			strength: 5,
			agility: 7,
			img: 'https://via.placeholder.com/150/66b7d2',
		},
		{
			name: 'Engineer',
			price: 16,
			strength: 6,
			agility: 5,
			img: 'https://via.placeholder.com/150/56acb2',
		},

		{
			name: 'Brawler',
			price: 11,
			strength: 8,
			agility: 3,
			img: 'https://via.placeholder.com/150/8985dc',
		},
		{
			name: 'Infiltrator',
			price: 17,
			strength: 5,
			agility: 9,
			img: 'https://via.placeholder.com/150/392537',
		},
		{
			name: 'Leader',
			price: 22,
			strength: 7,
			agility: 6,
			img: 'https://via.placeholder.com/150/602b9e',
		},
	];

	// Calculate team strength and agility
	const calculateStats = (teamArray) => {
		const strength = teamArray.reduce(
			(sum, member) => sum + member.strength,
			0
		);
		const agility = teamArray.reduce((sum, member) => sum + member.agility, 0);

		setTotalStrength(strength);
		setTotalAgility(agility);
	};

	// Handle Add Fighter
	const handleAddFighter = (fighter) => {
		if (money >= fighter.price) {
			const newTeam = [...team, fighter];
			setTeam(newTeam);
			setMoney(money - fighter.price);
			calculateStats(newTeam);
		} else {
			console.log('Not enough money');
		}
	};

	// Handle Remove Fighter
	const handleRemoveFighter = (fighter) => {
		const newTeam = team.filter((member) => member.id !== fighter.id);
		setTeam(newTeam);
		setMoney(money + fighter.price);
		calculateStats(newTeam);
	};

	useEffect(() => {
		calculateStats(team);
	}, [team]);

	return (
		<>
			<div>
				<h1>Zombie Fighters</h1>
				<strong>
					<div className='money'>Money: {money}</div>
				</strong>
				<strong>
					<div className='team strength'>Team Strength: {0}</div>
				</strong>
				<strong>
					<div className='team agility'>Team Agility: {0}</div>
				</strong>
				<strong>
					<div>Team</div>
				</strong>

				<p>Pick some team members</p>

				<h3>Fighters</h3>
				<ul className='fighterList'>
					{zombieFighters.map((fighter) => (
						<li key={fighter.id} className='fighterItem'>
							<img src={fighter.img} alt={fighter.name} />

							<div>
								<strong>{fighter.name}</strong>
								<p>Price: ${fighter.price}</p>
								<p>Strength: {fighter.strength}</p>
								<p>Agility: {fighter.agility}</p>
							</div>
							<button
								className='buttonRecruit'
								onClick={() => handleAddFighter(fighter)}
							>
								Add
							</button>
						</li>
					))}
				</ul>

				<h3>Your Team</h3>
				{team.length > 0 ? (
					<ul className='teamList'>
						{team.map((member) => (
							<li key={member.id} className='teamItem'>
								<img src={member.img} alt={member.name} />
								<div>
									<strong>{member.name}</strong>
									<p>Strength: {member.strength}</p>
									<p>Agility: {member.agility}</p>
									<p>Cost: ${member.price}</p>
								</div>
								<button
									className='buttonRemove'
									onClick={() => handleRemoveFighter(member)}
								>
									Remove
								</button>
							</li>
						))}
					</ul>
				) : (
					<p></p>
				)}

				<div className='stats'>
					<h4>Total Strength: {totalStrength}</h4>
					<h4>Total Agility: {totalAgility}</h4>
				</div>
			</div>
		</>
	);
};

export default App;
