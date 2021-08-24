import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import { NavLink } from 'react-router-dom';
class Intro extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: '',
		};
	}
	componentDidMount() {
		this.props.getListCourse();
	}
	scrollDown = () => {
		window.scroll({
			top: 625,
			left: 0,
			behavior: 'smooth',
		});
	};
	handleOnChange = event => {
		let { value } = event.target;
		this.setState({
			keyword: value,
		});
	};
	render() {
		return (
			<section className="intro">
				<div className="overflow"></div>
				<img src="./img/20.jpg" />
				<div className="content">
					<div>
						<h3 className="head-title">
							Getting started with <b>Elearning</b>
						</h3>
						<p className="head-subtitle">
							We pride ourselves on providing the most up-to-date content for
							<br />
							our students to learn each course
						</p>
					</div>
				</div>
				<div className="arrow-down" onClick={this.scrollDown}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</section>
		);
	}
}
const mapStateToProps = state => {
	return {
		listCourse: state.khoaHocReducer.listCourse,
	};
};
const mapDispatchToporps = dispatch => {
	return {
		getListCourse: () => {
			dispatch(actions.actGetListCourseAPI());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToporps)(Intro);
