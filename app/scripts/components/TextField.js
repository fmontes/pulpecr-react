var TextField = React.createClass({
  getInitialState: function() {
    return {
      validation: {
        isInvalid: true,
        message: 'Este campo es requerido',
        startValidation: false
      },
      isFocused: false,
      isDirty: false
    }
  },

  validate: function() {
    var validation = this.state.validation;

    if (!validation.startValidation) {
      validation.startValidation = true;
    }

    validation.isInvalid = !this.refs.field.value.length;

    if (this.props.type === 'tel' && this.refs.field.value.length > 0) {
      if (isNaN(parseInt(this.refs.field.value)) || this.refs.field.value.length !== 8) {
          validation.isInvalid = true;
          validation.message = 'Ingresa un numero de télefono válido: 11223344';
      }
    } else {
      validation.message = 'Este campo es requerido';
    }

    return validation;
  },

  isValid: function() {
    this.setState({
      validation: this.validate()
    });
    return !this.state.validation.isInvalid;
  },

  getValue: function() {
    return this.refs.field.value;
  },

  handleFocusState: function() {
    this.setState({
      isFocused: true
    });
  },

  handleBlurState: function() {
    this.setState({
      isFocused: false,
      isDirty: this.refs.field.value.length,
      validation: this.validate()
    });
  },

  render: function() {
    return (
      <div className={'mdl-textfield mdl-textfield--floating-label textfield ' + (this.state.isFocused ? ' is-focused' : '') + (this.state.validation.isInvalid && this.state.validation.startValidation ? ' is-invalid' : '') + (this.state.isDirty ? ' is-dirty' : '')}>
        <input className="mdl-textfield__input js-cart__form-input" ref="field" type={this.props.type || 'text'} id={this.props.id} onFocus={this.handleFocusState} onBlur={this.handleBlurState} />
        <label className="mdl-textfield__label" htmlFor={this.props.label}>{this.props.label}</label>
        <span className="mdl-textfield__error">{this.state.validation.message}</span>
      </div>
    )
  }
});

module.exports = TextField;
