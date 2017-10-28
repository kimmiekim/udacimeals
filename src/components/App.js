import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addRecipe, removeFromCalendar} from '../actions'
import { capitalize } from '../utils/helpers'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'

class App extends Component {
  doThings = () => {
    this.props.selectRecipe({})
  }
  render(){
    const { calendar, remove } = this.props
    const mealOrder = ['breakfast', 'lunch', 'dinner']
    return(
      <div className='container'>
        <ul className = 'meal-types'>
          {mealOrder.map( (mealType) => (
            <li key={mealType} className='subheader'>
              {capitalize(mealType)}
            </li>
          ))}
        </ul>

        <div className='calendar'>
          <div className='days'>
            {calendar.map(({day}) => <h3 key={day} className='subheader'>{capitalize(day)}</h3>)}
          </div>
          <div className = 'icon-grid'>
            {calendar.map(({ day, meals }) => (
              <ul key={day}>
                {mealOrder.map((meal)=> (
                  <li key={meal} className='meal'>
                    {meals[meal]
                      ? <div className='food-item'>
                        <img src={meals[meal].image} alt={meals[meal].label} />
                          <button onClick={() => remove({meal, day})}>Clear</button>
                        </div>
                      : <button className='icon-btn'>
                            <CalendarIcon size={30} />
                        </button>}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

//inside mapStateToProps function we are reformatting the js obj
//into arrays
//so react and work with the array of data
//with redux, it's more natural to have data structure in obj format

function mapStateToProps({calendar, food}) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  return {
    calendar: dayOrder.map((day) => {
      console.log("for ",day);
      return {
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? food[calendar[day][meal]]
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
