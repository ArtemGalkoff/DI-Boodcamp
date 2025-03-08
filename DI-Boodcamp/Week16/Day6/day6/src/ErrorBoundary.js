import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // Инициализация состояния, error - null, errorInfo - пустой объект
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  // Этот метод вызывается при возникновении ошибки в дочернем компоненте
  componentDidCatch(error, errorInfo) {
    // Устанавливаем состояние с ошибкой и информацией о ней
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    // Если ошибка произошла, рендерим сообщение об ошибке
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Что-то пошло не так.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // Если ошибки нет, рендерим дочерние компоненты
    return this.props.children;
  }
}

export default ErrorBoundary;