import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addRecipe, removeFromCalendar} from '../actions'

class App extends Component {
  doThings = () => {
    this.props.selectRecipe({})
  }
  render(){
    console.log('Props', this.props)
    return(
      <div>
        hello world
      </div>
    )
  }
}

//inside mapStateToProps function we are reformatting the js obj
//into arrays
//so react and work with the array of data
//with redux, it's more natural to have data structure in obj format

function mapStateToProps(calendar) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  return {
    calendar: dayOrder.map((day) => {
      console.log("for ",day);
      return {
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? calendar[day][meal]
          : null
        console.log("reduced meals to:", meals);
        return meals
      }, {})
    }})
  }
}

function mapDispatchToProps (dispatch) {
  return {
    selectRecipe: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
