import * as React from 'react'
require('../../style/loading.scss')

export default class LoadingBackground extends React.Component {
  render () {
    const isShowed = this.props.isShowed
    return (
      <div className={isShowed ? 'loading-background' : 'hidden'}>
        <div></div>
      </div>
    )
  }
}
