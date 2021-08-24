import * as $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/index';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
class KhoaHoc extends Component {
	componentDidMount() {
		$(function () {
			$('.HeartAnimation').click(function () {
				$(this).toggleClass('animate');
			});
		});
	}
	addToCart = () => {
		localStorage.getItem('user')
			? this.props.addToCart(this.props)
			: Swal.fire({
				position: 'center',
				icon: 'error',
				html: `<h3 style="color:#f27474"><b>ERROR!</b></h3><b>VUI LÒNG ĐĂNG NHẬP</b>`,
				showConfirmButton: false,
				timer: 1500,
			});
	};
	renderAddToCart = () => {
		return this.props.listCart.findIndex(item => {
			return item.course.maKhoaHoc === this.props.course.maKhoaHoc;
		}) === -1 ? (
			<button className="btn--blue btnn" onClick={this.addToCart}>
				THÊM GIỎ HÀNG
			</button>
		) : (
			<NavLink className="btn--purple btnn" to="/home/detail-cart">
				TỚI GIỎ HÀNG
			</NavLink>
		);
	};
	handleAddToCart = () => {
		return this.props.courseOfUser ? (
			this.props.courseOfUser.findIndex(item => {
				return item.maKhoaHoc === this.props.course.maKhoaHoc;
			}) === -1 ? (
				this.renderAddToCart()
			) : (
				<NavLink className="btn--black btnn" to="/home/profile">
					TỚI HỒ SƠ CÁ NHÂN
				</NavLink>
			)
		) : (
			this.renderAddToCart()
		);
	};
	render() {
		let { course } = this.props;
		return (
			<div className="khoa-hoc">
				<div className="wallpaper">
					<img src={course.hinhAnh} />
					<div className="overflow">
						<div className="ct-wallpaper">
							<h3>{course.tenKhoaHoc}</h3>
							<p>{course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
						</div>
					</div>
				</div>
				<div className="main-content">
					<div className="relative">
						<div className="btn-group">
							<NavLink
								className="btn--white btnn"
								to={`/home/detail-course/${course.maKhoaHoc}?${course.fee}`}
							>
								CHI TIẾT
							</NavLink>
							{this.handleAddToCart()}
							<div className="like">
								<div className="HeartAnimation"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		listCart: state.GioHangReducer.listCart,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		addToCart: product => {
			dispatch(actions.actAddToCart(product));
		},
		getInfoAccount: () => {
			dispatch(actions.actGetInfoAccount());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(KhoaHoc);
