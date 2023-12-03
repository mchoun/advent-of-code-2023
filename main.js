import csv from 'csv-parser'
import { open } from 'node:fs/promises'

const results = []

const fd = await open('./data.csv')

const stream = fd.createReadStream()

// stream
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     let sum = 0
//     for (let item of results) {
//       sum += parseCalibrationValue(item.value)
//     }
//     console.log(sum)
//   })

function parseCalibrationValue(string) {
  string = convertDigits(string)
  const stringArray = string.split('')
  const firstNumber = stringArray.find((character) => !isNaN(character))
  const lastNumber = stringArray.findLast((character) => !isNaN(character))
  return Number(firstNumber + lastNumber)
}

function convertDigits(string) {
  const convertedString = ''
  const digitMap = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  }

  for (let word in digitMap) {
    const regex = new RegExp(word, 'gi')
    string = string.replace(regex, digitMap[word])
  }

  return string
}

console.log(parseCalibrationValue('two1nine'))
console.log(parseCalibrationValue('eightwothree'))
console.log(parseCalibrationValue('4nineeightseven2'))
console.log(convertDigits('eightwothree'))
