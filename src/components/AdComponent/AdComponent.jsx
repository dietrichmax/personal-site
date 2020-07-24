import React from "react";

export default class Google extends React.Component {
  componentDidMount() {
    if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  };

  render() {
    return (
      <ins className={`${this.props.className} adsbygoogle`}
        style={this.props.style}
        data-ad-client={this.props.client}
        data-ad-slot={this.props.slot}
        data-ad-layout={this.props.layout}
        data-ad-layout-key={this.props.layoutKey}
        data-ad-format={this.props.format}
        data-full-width-responsive={this.props.responsive}></ins>
    );
  }
};

Google.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line
  client: PropTypes.string.isRequired,
  slot: PropTypes.string.isRequired,
  layout: PropTypes.string,
  layoutKey: PropTypes.string,
  format: PropTypes.string,
  responsive: PropTypes.string
};

Google.defaultProps = {
  className: '',
  style: {display: 'block'},
  client: 'ca-pub-0037698828864449',
  slot: '6317800418',
  layout: '',
  layoutKey: '',
  format: 'auto',
  responsive: 'true'
};
