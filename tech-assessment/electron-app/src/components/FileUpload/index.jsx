import React, { Component } from 'react'
import SearchIcon from '../../icons/Search.svg'
import './style.css'

class FileUpload extends Component {
  onChange (e) {
    if (e.target.files && e.target.files.length > 0) {
      this.props.onUpload({file: e.target.files[0]})
    }
  }

  render () {
    const { label, placeholder, error } = this.props
    return (<div className='file-upload-container'>
      <div className='file-upload'>
        <p>{label}</p>
        <button onClick={() => this.inputElement.click()}>
          {placeholder}
          <img src={SearchIcon} alt='' />
        </button>
        <input type='file' accept='.csv' ref={input => { this.inputElement = input }} onChange={this.onChange.bind(this)} />
      </div>
      { error && <span className='error-text'>Error Occurred During Upload, Upload Failed</span> }
    </div>)
  }
}
FileUpload.defaultProps = {
  label: 'Import Employee',
  placeholder: 'Browse File (.CSV)',
  error: false
}

export default FileUpload
