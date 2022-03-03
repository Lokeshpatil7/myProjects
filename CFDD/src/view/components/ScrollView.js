import React from 'react'
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";


const ScrollView = ({children}) => {
    const Arrow = ({ text, className }) => {
        return (
          <div
            className={className}
          >{text}</div>
        );
      };
      
    const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
    const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
    return (
        <div>
            <ScrollMenu
            LeftArrow={ArrowLeft}
            RightArrow={ArrowRight}
          >
              {children}
          </ScrollMenu>
        </div>
    )
}

export default ScrollView
