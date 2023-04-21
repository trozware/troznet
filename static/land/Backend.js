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

const fetchUtilityData = async () => {
  return await fetch('UtilityCycles.json')
    .then(response => response.json())
    .then(jsonResponse => {
      return jsonResponse
    })
    .catch(error => {
      console.log(error)
      return { error }
    })
}

let utilityLands = []

const fetchUtilityCycles = async () => {
  utilityLands = await fetchUtilityData()
  hideUnusableUtilityLands()
}

fetchUtilityCycles()

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

  let utilityLandsFilteredByCycle = []

  utilityLands.forEach(e => {
    if (activeCycles.includes(e.cycle)) {
      e.lands.forEach(e => {
        utilityLandsFilteredByCycle.push(e)
      })
    }
  })

  let utilityLandsToPrint = ''

  utilityLandsFilteredByCycle.forEach(e => {
    if (containsAll(activeColours, e.colours) === true) {
      utilityLandsToPrint = utilityLandsToPrint + `${e.name} \n`
    }
  })

  landbaseTextbox.textContent = ''
  landbaseTextbox.textContent = landsToPrint + utilityLandsToPrint
}

const manaSymbols = document.querySelectorAll('.manasymbol')

hideUnusableUtilityLands = function () {
  activeUtilityLands = []
  utilityLands.forEach(utilityCycle => {
    utilityCycle.lands.forEach(land => {
      if (containsAll(activeColours, land.colours) === true) {
        activeUtilityLands.push(utilityCycle.cycle)
      }
    })
  })

  const utilityLandElements = document.querySelectorAll('.utilityLand')

  utilityLandElements.forEach(e => {
    e.parentElement.style.display = 'none'
    if (activeUtilityLands.includes(e.id)) {
      e.parentElement.style.display = 'inline-flex'
    }
  })
}

manaSymbols.forEach(function (node) {
  node.addEventListener('click', function (e) {
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
    hideUnusableUtilityLands()
  })
  node.addEventListener('click', function (e) {
    if (e.target.classList.contains('checked')) {
      e.target.classList.remove('checked')
      e.target.classList.add('unchecked')
    } else {
      e.target.classList.remove('unchecked')
      e.target.classList.add('checked')
    }
  })
})

const exampleLands = document.querySelectorAll('.landspan')
for (const div of exampleLands) {
  div.addEventListener('click', function (e) {
    let checkedCycle = ''
    if (e.target.nodeName === 'IMG') {
      checkedCycle = e.target.id
    } else if (e.target.nodeName === 'DIV') {
      checkedCycle = e.target.firstElementChild.id
    } else {
      checkedCycle = e.target.parentElement.firstElementChild.id
    }

    if (activeCycles.includes(checkedCycle)) {
      activeCycles.splice(
        activeCycles.findIndex(e => e === checkedCycle),
        1
      )
    } else {
      activeCycles.push(checkedCycle)
    }
    printText()

    if (e.target.tagName === 'DIV') {
      const divToCheck = e.target
      if (divToCheck.classList.contains('checked')) {
        divToCheck.classList.remove('checked')
        divToCheck.classList.add('unchecked')
      } else {
        divToCheck.classList.remove('unchecked')
        divToCheck.classList.add('checked')
      }
    } else {
      const divToCheck = e.target.parentElement
      if (divToCheck.classList.contains('checked')) {
        divToCheck.classList.remove('checked')
        divToCheck.classList.add('unchecked')
      } else {
        divToCheck.classList.remove('unchecked')
        divToCheck.classList.add('checked')
      }
    }
  })
}

const copyContent = async () => {
  let textToCopy = document.querySelector('#landbase-textbox').innerHTML
  try {
    await navigator.clipboard.writeText(textToCopy)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

const copyButton = document.querySelector('#copy-button')
copyButton.addEventListener('click', function (e) {
  copyContent()
})

printText()

toggleObjectDisplay = function () {
  const toggleButton = document.querySelector('#utility-button')
  const objectToHide = document.querySelector('#utility')
  if (objectToHide.style.display === 'none') {
    objectToHide.style.display = 'block'
    toggleButton.textContent = 'Hide Utility Lands'
  } else {
    objectToHide.style.display = 'none'
    toggleButton.textContent = 'Show Utility Lands'
  }
}

toggleObjectDisplay()

document
  .querySelector('#utility-button')
  .addEventListener('click', function (e) {
    toggleObjectDisplay()
    hideUnusableUtilityLands()
  })
