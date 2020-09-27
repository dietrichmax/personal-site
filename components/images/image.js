import styled from 'styled-components';
import Img from '@/components/images/image';
import Link from 'next/link'

//const fs = require('fs');
//import 'lazysizes/plugins/attrchange/ls.attrchange';
//import 'lazysizes';


// styled components
const Image = styled.img`
height: ${props => props.height ? props.height : "100%" };
width: ${props => props.width ? props.width : "100%" };
`


class ImageComponent extends React.Component {
    


    
    /*componentWillMount() {
    }*/


    render() {        


        return (
            <>
                <Image 
                    src={this.props.src} 
                    alt={this.props.alt} 
                    title={this.props.title} 
                    width={this.props.width} 
                    height={this.props.height} 
                /> 
            </>
        );
    }
}

export default Image
