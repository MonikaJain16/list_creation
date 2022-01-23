import React,{useState, useEffect} from 'react';
import "./style.css";

//Getting Data from Local storage
const getLocalData = () => {
  const lists = localStorage.getItem('myList');
  if(lists){
    return JSON.parse(lists); 
  }
  else{
    return []; 
  }
};

const Todo = () => {
   const [inputData, setInputData] = useState("");
   const [items, setItems] = useState(getLocalData());
   const [isEditItem, setIsEditItem] = useState('');
   const [toggleButton, setToggleButton] = useState(false);

    //  function  to add inputted items
    const addItem=()=>{
        if(!inputData){
        window.alert('The Field is blank, Please enter a value');
    }else if(inputData && toggleButton){
        setItems(
          items.map((currElement) => {
            if(currElement.id === isEditItem){
              return {...currElement, name : inputData};
            }
            else{
              return currElement;
            }
          }) 
        );
        setInputData([]);
        setIsEditItem(null);
        setToggleButton(false);
    }
    else{
          const myNewInputData={
          id: new Date().getTime().toString(),
          name: inputData 
    };
    setItems([...items,myNewInputData]);
    setInputData('');
    }
};

  //function to edit item
  const editItem = (index) => { 
    const edit_item = items.find((currElement) => {
      return (currElement.id === index);
    });
    setInputData(edit_item.name);
    setIsEditItem(index);
    setToggleButton(true);
    
  };
 
// function to remove selected items
  const deleteItem = (index) => {
      const updatedItem = items.filter((currElement) => {
      return currElement.id !== index;
      });
      setItems(updatedItem);  
  };

  //function to remove entire list element
  const removeAll = () =>{
    setItems([]);
    setInputData('');
    setToggleButton(false);
  };

  const keyPressListener = (e) => {
    if(e.keyCode === 13){
        return addItem;
    }
  };

  //local storage
  useEffect(() => {
    localStorage.setItem('myList',JSON.stringify(items))
  },[items]);

  return <>
    <div className='main-div'>   
        <div className='child-div'>
            <figure>
                <img src="\to-do-list.jpg" alt="list_creation_logo"></img>
                <figcaption>Add Your List Items ✌</figcaption>
            </figure>
            <div className='addItems'>
                <input id="input_item" type="text" placeholder='✍ Add Item'  className='form-control' value={inputData}  onChange={(e)=>{setInputData(e.target.value)}} /> 
                {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
            </div>
            <div className='showItems'>
              {
                items.map((currElement)=>{
                  return(
                    <div className='eachItem' key={currElement.id}>
                    <h3>{currElement.name}</h3>
                    <div className='todo-btn'>
                      <i className='far fa-edit add-btn' onClick = { () => editItem(currElement.id) }></i>
                      <i className='far fa-trash-alt add-btn' onClick={()=> deleteItem(currElement.id)}></i>
                    </div>
                    </div>
                  )
                })
              }
              
            </div>
            <div className='showItems'>
              <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span></button>
            </div>
        </div>
    </div>
  </>;
};

export default Todo;
