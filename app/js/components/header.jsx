const React            = require('react'),
      ReactBootstrap   = require('react-bootstrap'),
      ProductFormModal = require('./product-form-modal'),

      Button       = ReactBootstrap.Button,
      ModalTrigger = ReactBootstrap.ModalTrigger;

class Header extends React.Component {
  constructor(props){
    super(props);
  }
  onToggerModal(){
    // 关闭 Modal, 不做处理默认关闭操作
  }
  render(){
    return (
      <ModalTrigger modal={<ProductFormModal onRequestHide={this.onToggerModal.bind(this)} />}>
        <Button className="pull-right" bsStyle='success' onClick={this.onToggerModal.bind(this)} ><i className="fa fa-plus"></i>  新增产品</Button>
      </ModalTrigger>
    );
  }
}

module.exports = Header;
