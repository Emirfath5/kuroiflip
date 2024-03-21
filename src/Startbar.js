import React from 'react'
import {Segment,Menu} from 'semantic-ui-react'

function Startbar(props) {

    const handleItemClick = () => {
        console.log("Item Clicked")
    }

    return (
        <div>
            <Segment inverted>
                <Menu inverted pointing secondary>
                    <Menu.Item
                        name='Login'
                        active={props.type === 'login'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='Register'
                        active={props.type === 'register'}
                        onClick={handleItemClick}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='Twitter'
                            as='a'
                            href='https://twitter.com/KuroiNFTs'
                            target='_blank'
                        />
                        <Menu.Item
                            name='Topaz Collection'
                            as='a'
                            href='https://www.topaz.so/collection/Kuroi-36db3ce38f'
                            target='_blank'
                        />
                    </Menu.Menu>
                </Menu>
            </Segment>
        </div>
    );cd
}

export default Startbar
