const fetchJsonData = async () => {
  return await fetch('Cycles.json')
    .then(response => response.json())
    .then(jsonResponse => {
      return jsonResponse
    })
    .catch(error => {
      console.log(error)
      return { error }
    })
}

let lands = []

const fetchCycles = async () => {
  lands = await fetchJsonData()
  printText()
}

fetchCycles()

let activeColours = []
let activeCycles = ['commandtower', 'exoticorchard', 'pathofancestry']
const landbaseTextbox = document.querySelector('#landbase-textbox')

containsAll = function (array1, array2) {
  for (const element of array2) {
    if (!array1.includes(element)) {
      return false
    }
  }
  return true
}

printText = function () {
  let landsFilteredByCycle = []
  lands.forEach(e => {
    if (activeCycles.includes(e.cycle)) {
      e.lands.forEach(e => {
        landsFilteredByCycle.push(e)
      })
    }
  })

  let landsToPrint = ''

  landsFilteredByCycle.forEach(e => {
    if (containsAll(activeColours, e.colours) === true) {
      landsToPrint = landsToPrint + `${e.name} \n`
    }
  })

  landbaseTextbox.textContent = ''
  landbaseTextbox.textContent = landsToPrint
}

const manaSymbols = document.querySelectorAll('.manasymbol')

manaSymbols.forEach(function (node) {
  node.addEventListener('click', function (e) {
    console.log(e)
    const checkedColour = e.target.id
    if (activeColours.includes(checkedColour)) {
      activeColours.splice(
        activeColours.findIndex(e => e === checkedColour),
        1
      )
    } else {
      activeColours.push(checkedColour)
    }
    printText()
  })
  node.addEventListener('click', function (e) {
    console.log(e)
    if (e.target.classList.contains('checked')) {
      e.target.classList.remove('checked')
      e.target.classList.add('unchecked')
    } else {
      e.target.classList.remove('unchecked')
      e.target.classList.add('checked')
    }
  })
})

const exampleLands = document.querySelectorAll('.exampleLand')

exampleLands.forEach(function (node) {
  node.addEventListener('click', function (e) {
    const checkedCycle = e.target.id
    if (activeCycles.includes(checkedCycle)) {
      activeCycles.splice(
        activeCycles.findIndex(e => e === checkedCycle),
        1
      )
    } else {
      activeCycles.push(checkedCycle)
    }
    printText()
  })

  node.addEventListener('click', function (e) {
    console.log(e)
    if (e.target.classList.contains('checked')) {
      e.target.classList.remove('checked')
      e.target.classList.add('unchecked')
    } else {
      e.target.classList.remove('unchecked')
      e.target.classList.add('checked')
    }
  })
})

printText()
