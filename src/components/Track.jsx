import React, { useState } from 'react'
import Header from './Header';
import { UserContext } from '../Contexts/UserContext';
import { useContext } from 'react';
import Food from './Food';

function Track() {


  const loggedData = useContext(UserContext);

  const [foodItems, setFoodItems] = useState([]);

  const [food,setFood]=useState(null);

  function searchFood(event) {

    if (event.target.value !== '') {

      fetch(`http://127.0.0.1:8000/foods/${event.target.value}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + loggedData.loggedUser.token
        }


      })
        .then((response) => response.json())
        .then((data) => {

          if(data.message==undefined){

            setFoodItems(data);

          }
          else{
            setFoodItems([]);
          }
          
        })
        .catch((err) => {
          console.log(err);
        })

    }
    else{
      setFoodItems([]);
    }


  }


  

  return (
    <div>

      <section className='container track-container'>

        <Header/>

        <div className='search'>
          <input className='search-inp' onChange={searchFood} type="search" placeholder='Search Food Item' />

          {
            foodItems.length !== 0?(

              <div className='search-results'>

                {
                  foodItems.map((item) => {
                    return (
                      <p className='item' onClick={()=>{setFood(item)}} key={item._id}>{item.name}</p>
                    )
                  })
                }

              </div>

            ):null
          }




        </div>

        {

          food!==null?(

            <Food food={food}/>

          ):null

        }

        

        

      </section>
    </div>
  )
}

export default Track
