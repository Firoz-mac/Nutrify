import React, { useEffect, useState } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { useContext } from 'react'
import Header from './Header'

function Diet() {

    let loggedData=useContext(UserContext);

    const [items,setItems]=useState([]);

    const [date,setDate]=useState(new Date())


    // let dateNew=date.getDate()
    // console.log(dateNew)

    

    let [total,setTotal]= useState({
        totalCalories:0,
        totalProtein:0,
        totalCarbs:0,
        totalFats:0,
        totalFiber:0
    })

    useEffect(()=>{

        fetch(`http://127.0.0.1:8000/track/${loggedData.loggedUser.userId}/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,{
            method:'GET',
            headers:{
                'Authorization': 'Bearer ' + loggedData.loggedUser.token
            }
        })
        .then((response)=>response.json())
        .then((data)=>{

            console.log(data)
            setItems(data)

        })
        .catch((err)=>{
            console.log(err)
        })

    },[date])

    useEffect(()=>{
        calculateTotal()

    },[items])


    function calculateTotal(){

        let totalCopy={
            totalCalories:0,
            totalProtein:0,
            totalCarbs:0,
            totalFats:0,
            totalFiber:0
        };

        items.forEach((item)=>{

            totalCopy.totalCalories += item.details.calories;
            totalCopy.totalProtein += item.details.protein;
            totalCopy.totalCarbs += item.details.carbohydrates;
            totalCopy.totalFats += item.details.fat;
            totalCopy.totalFiber += item.details.fiber;

        })
        setTotal(totalCopy);

    }


  return (
    <section className='container diet-container'>
        <Header/>

        <input className='inp-date' type="date" onChange={(event)=>{setDate(new Date(event.target.value))}} />

        {

            items.length!==0?(

                items.map((item)=>{
               
                    return(
                        <div className='items' key={item._id}>
    
                            <h3>{item.foodId.name} ( {item.details.calories} Kcal for {item.quantity}g )</h3>
                            <p>Protein {item.details.protein}g , Carbs {item.details.carbohydrates}g , Fat {item.details.fat}g , Fiber {item.details.fiber}g </p>
    
                        </div>
                    )
                })

            ):<p>You Dont have anything In This Date</p>

            
            
        }

        {
            items.length!==0?(

                <div className='items'>
                    <h3>{total.totalCalories} Kcal</h3>
                    <p>Protein {total.totalProtein}g , Carbs {total.totalCarbs}g , Fat {total.totalFats}g , Fiber {total.totalFiber}g </p>
                </div>

            ):null
        }

        

    </section>
  )
}

export default Diet
