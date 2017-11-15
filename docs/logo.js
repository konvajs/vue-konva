import React from 'react'
import logo from '../vue-konva.png'

export default function LogoRenderer() {
    return React.createElement('img', {
        src: logo,
        style: {
            width: '80%',
            display: 'block',
            margin: '0 auto',
        },
    }, null)
}
