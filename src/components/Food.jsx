import React, { useEffect, useState } from 'react'
import { UserContext } from '../Contexts/UserContext';
import { useContext } from 'react';


function Food(props) {

    const [eatenQuantity,setEatenQuantity]=useState(100);
    const [food,setFood]=useState({});
    const [foodInitial,setfoodInitial]=useState({});
    // console.log(food)

    let loggedData=useContext(UserContext);




    useEffect(()=>{
      setFood(props.food);
      setfoodInitial(props.food)

      console.log(loggedData);
      console.log(props.food)
    },[props.food])


    function calculateMacros(event){


      if(event.target.value.length!==0){


        let quantity=Number(event.target.value);
        setEatenQuantity(quantity)

        let copyFood = {...food};

        copyFood.protein=(foodInitial.protein*quantity)/100;
        copyFood.carbohydrates=(foodInitial.carbohydrates*quantity)/100;
        copyFood.fat=(foodInitial.fat*quantity)/100;
        copyFood.fiber=(foodInitial.fiber*quantity)/100;
        copyFood.calories=(foodInitial.calories*quantity)/100;

        setFood(copyFood);

      }

    }


    function trackFoodItem(){

      let trackedItem={
        userId:loggedData.loggedUser.userId,
        foodId:food._id,
        details:{
          protein:food.protein,
          carbohydrates:food.carbohydrates,
          fat:food.fat,
          fiber:food.fiber,
          calories:food.calories
        },
        quantity:eatenQuantity

      }
      console.log(trackedItem)

      fetch('http://127.0.0.1:8000/track',{
        method:'POST',
        body:JSON.stringify(trackedItem),
        headers:{
          'Authorization': 'Bearer ' + loggedData.loggedUser.token,
          'Content-Type':'application/json'
        }
      })
      .then((response)=>response.json())
      .then((data)=>{
        console.log(data)
      })
      .catch((err)=>{
        console.log(err)
      })

    }




  return (
    <div className='food'>

          <div className='food-img'>
            <img className='food-image' src={food.image} alt="hi" />
          </div>
          <h3>{food.name} ({food.calories} Kcal For {eatenQuantity}G)</h3>

          <div className='nutrient'>

            <p className='n-title'>Protein</p>
            <p className='n-value'>{food.protein}</p>

          </div>
          <div className='nutrient'>

            <p className='n-title'>Carbs</p>
            <p className='n-value'>{food.carbohydrates}</p>

          </div>
          <div className='nutrient'>

            <p className='n-title'>Fat</p>
            <p className='n-value'>{food.fat}</p>

          </div>
          <div className='nutrient'>

            <p className='n-title'>Fiber</p>
            <p className='n-value'>{food.fiber}</p>

          </div>

          <div className='track-control'>

            <input type="number" onChange={calculateMacros} className='inp' placeholder='Quantity in Gms'/>
            <button onClick={trackFoodItem} className='btn'>Track</button>


          </div>

          


    </div>
  )
}

export default Food
