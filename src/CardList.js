import React from 'react';
import Card from './Cards';

const CardList = ({robotsList}) => {
    return(
        <div>
          {
            robotsList.map((user,i) => {
            return (<Card
                key={[i]}
                id={user.id} 
                name={user.name} 
                email={user.email}
                />
              );
            })
          }
        </div>
    );
}


export default CardList;