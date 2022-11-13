import React, { useState, useEffect, useContext, Children } from 'react';
import './stack.css';
import Card from '../Card/Card';
import { IsTopContext } from '../../context/isTopContext';

const Stack = ({ onVote, children, index, ...props }) => {

    const [stack, setStack] = useState(Children.toArray(children));

    const [staticStack, setStaticStack] = useState(Children.toArray(children));

    const [stackIndex, setStackIndex] = useState('');

    const { isTop, setIsTop} = useContext(IsTopContext);
    
    const pop = (array) => {
      return array.filter((_, index) => {
        setStackIndex(index);
        return index < array.length - 1
      })
    }
  
    const handleVote = (item, vote) => {

      let newStack = pop(stack)
      setStack(newStack)

      //console.log(stack);
  
      onVote(item, vote)
    }


    if (stack.length < staticStack.length) {
      for(let i = 0; i <= staticStack.length - 1; i++) {

        //console.log(staticStack);
        stack.unshift(staticStack[i]);
      }
      if (stack.key === stack.key) {
        //console.log('EQUAL KEYS!!');
        stack.splice(index, 1);
      }
    }

return (
    <div className='stack' {...props}>
        {stack.map((item, index) => {
          let isTop = index === stack.length - 1;

          setIsTop(isTop);

          return (
            <Card
              isTop = {isTop}
              drag={isTop} // Only top card is draggable
              key={item.key || index}
              onVote={(result) => handleVote(item, result)}
            >
              {item}
            </Card>
          )
        })}
    </div>
  )
}

export default Stack