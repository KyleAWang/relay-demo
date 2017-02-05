import React from 'react'
import Relay from 'react-relay'

class ItemsComponent extends React.Component{
    renderItems(){
        return this.props.items.map(item => {
            <div key={item.id}>{item.name}</div>
        })
    }

    render(){
        {this.renderItems()}
    }
}

export default Relay.createContainer(ItemsComponent, {
    fragments: {
        items: () => Relay.QL`
            fragment on Item @relay(plural:true){
                id,
                name,
                price,
                quantity,
                url
            }
        `
    }
})