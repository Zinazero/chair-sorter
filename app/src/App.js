import './App.css';
import React, { useState } from 'react';

function App() {
	const [frontRow, setFrontRow] = useState([
		'Alyssa',
		'Randall',
		'Hunter',
		'Jake',
		'Emma',
		'Jacob',
		'Mason',
	]);
	const [backRow, setBackRow] = useState([
		'Ash',
		'Matt',
		'Rohit',
		'Kara',
		'Alex',
		'Keara',
		'Jared',
		'Natalie',
	]);

	const moveLeft = (e, row) => {
		let arr = [];
		if (row === 'front') {
			arr = [...frontRow];
		} else {
			arr = [...backRow];
		}

		const moveIndex = arr.indexOf(e);
		const swapIndex = arr.indexOf(e) - 1;

		[arr[moveIndex], arr[swapIndex]] = [arr[swapIndex], arr[moveIndex]];
		if (row === 'front') setFrontRow(arr);
		if (row === 'back') setBackRow(arr);
	};

	const moveRight = (e, row) => {
		let arr = [];
		if (row === 'front') {
			arr = [...frontRow];
		} else {
			arr = [...backRow];
		}

		const moveIndex = arr.indexOf(e);
		const swapIndex = arr.indexOf(e) + 1;

		[arr[moveIndex], arr[swapIndex]] = [arr[swapIndex], arr[moveIndex]];
		if (row === 'front') setFrontRow(arr);
		if (row === 'back') setBackRow(arr);
	};

	const moveToOther = (e, row) => {
		let oldArr = [];
		let newArr = [];
		if (row === 'front') {
			oldArr = [...frontRow];
			newArr = [...backRow];
		} else {
			oldArr = [...backRow];
			newArr = [...frontRow];
		}

		const moveIndex = oldArr.indexOf(e);
		oldArr.splice(moveIndex, 1);
		newArr.push(e);

		if (row === 'front') {
			setFrontRow(oldArr);
			setBackRow(newArr);
		} else {
			setBackRow(oldArr);
			setFrontRow(newArr);
		}
	};

	//let people = ['Alyssa', 'Jacob', 'Jake', 'Emma', 'Ash', 'Matt', 'Alex', 'Natalie', 'Kara', 'Jared'];

	// Helper: generate all combinations of k elements from array
	const combinations = (arr, k) => {
		const result = [];
		const backtrack = (start, comb) => {
			if (comb.length === k) {
				result.push([...comb]);
				return;
			}
			for (let i = start; i < arr.length; i++) {
				comb.push(arr[i]);
				backtrack(i + 1, comb);
				comb.pop();
			}
		};
		backtrack(0, []);
		return result;
	};

  const isValidSplit = (frontRow, backRow, proximityPairs) => {
    for (const [p1, p2] of proximityPairs) {
      const idx1Front = frontRow.indexOf(p1);
      const idx2Front = frontRow.indexOf(p2);
      const idx1Back = backRow.indexOf(p1);
      const idx2Back = backRow.indexOf(p2);
  
      const sameRowTooFar = (i1, i2) => i1 !== -1 && i2 !== -1 && Math.abs(i1 - i2) > 1;
  
      // Both in front row
      if (idx1Front !== -1 && idx2Front !== -1 && sameRowTooFar(idx1Front, idx2Front))
        return false;
  
      // Both in back row
      if (idx1Back !== -1 && idx2Back !== -1 && sameRowTooFar(idx1Back, idx2Back))
        return false;
  
      // One in front, one in back — vertical proximity must match
      if (
        (idx1Front !== -1 && idx2Back !== -1 && idx1Front !== idx2Back) ||
        (idx1Back !== -1 && idx2Front !== -1 && idx1Back !== idx2Front)
      )
        return false;
    }
    return true;
  };
  

	// Main function
	const generateValidConfigurations = (
		names,
		frontSize,
		backSize,
		proximityPairs
	) => {
		const results = [];
		const frontCombinations = combinations(names, frontSize);

		for (const frontRow of frontCombinations) {
			const backRow = names.filter((n) => !frontRow.includes(n));
			if (backRow.length !== backSize) continue;

			if (isValidSplit(frontRow, backRow, proximityPairs)) {
				results.push({ frontRow, backRow });
			}
		}

		return results;
	};

	const names = [
		'Alyssa',
		'Jacob',
		'Randall',
		'Jake',
		'Emma',
		'Mason',
		'Hunter',
		'Keara',
		'Ash',
		'Matt',
		'Alex',
		'Natalie',
		'Kara',
		'Jared',
		'Rohit',
	];
	const proximityPairs = [
		['Alyssa', 'Jacob'],
		['Emma', 'Jake'],
		['Natalie', 'Alex'],
		['Kara', 'Jared'],
		['Natalie', 'Kara'],
		['Matt', 'Jake'],
		['Matt', 'Alex'],
		['Matt', 'Ash'],
	];

	const validConfigs = generateValidConfigurations(names, 8, 7, proximityPairs);
	console.log(`Found ${validConfigs.length} valid configurations.`);
	console.log(validConfigs);

	return (
		<div className='App'>
			<div className='mainView'>
				<table>
					<tbody>
						<tr className='row' id='front-row'>
							{frontRow.map((person, index) => (
								<td key={index} className='person'>
									{index > 0 && (
										<button
											value={person}
											onClick={(e) => moveLeft(e.target.value, 'front')}
										>
											{'<'}
										</button>
									)}
									<button
										value={person}
										onClick={(e) => moveToOther(e.target.value, 'front')}
									>
										{person}
									</button>
									{index < frontRow.length - 1 && (
										<button
											value={person}
											onClick={(e) => moveRight(e.target.value, 'front')}
										>
											{'>'}
										</button>
									)}
								</td>
							))}
						</tr>
						<tr className='row' id='back-row'>
							{backRow.map((person, index) => (
								<td key={index} className='person'>
									{index > 0 && (
										<button
											value={person}
											onClick={(e) => moveLeft(e.target.value, 'back')}
										>
											{'<'}
										</button>
									)}
									<button
										value={person}
										onClick={(e) => moveToOther(e.target.value, 'back')}
									>
										{person}
									</button>
									{index < backRow.length - 1 && (
										<button
											value={person}
											onClick={(e) => moveRight(e.target.value, 'back')}
										>
											{'>'}
										</button>
									)}
								</td>
							))}
							<td>
								<button
									onClick={() => {
										const configs = generateValidConfigurations(
											names,
											8,
											7,
											proximityPairs
										);
										if (configs.length > 0) {
											const randIndex = Math.floor(
												Math.random() * configs.length
											);
											setFrontRow(configs[randIndex].frontRow);
											setBackRow(configs[randIndex].backRow);
										}
									}}
								>
									SORT
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
