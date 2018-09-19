import React, { Component } from "react";
import axios from "axios";

class NewBeer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			tagline: "",
			description: "",
			first_brewed: "",
			brewers_tips: "",
			attenuation_level: "",
			contributed_by: "",
			status: false
		};

		this._submit = this._submit.bind(this);
		this._handleChange = this._handleChange.bind(this);
	}
	render() {
		let form;
		if (this.state.status === false) {
			form = (
				<div className="container">
					<form onSubmit={this._submit}>
						<div className="form-group">
							<div className="mt-1">
								<label htmlFor="name">
									Name
									<input
										value={this.state.name}
										onChange={this._handleChange}
										className="form-control"
										type="text"
										id="name"
										name="name"
									/>
								</label>
							</div>
							<div className="mt-1">
								<label htmlFor="tagline">
									Tagline
									<input
										value={this.state.tagline}
										onChange={this._handleChange}
										type="text"
										id="tagline"
										name="tagline"
										className="form-control"
									/>
								</label>
							</div>
							<div className="mt-1">
								<label htmlFor="description">
									Description
									<textarea
										value={this.state.description}
										onChange={this._handleChange}
										name="description"
										className="form-control"
										id="description"
										cols="30"
										rows="10"
									/>
								</label>
							</div>
							<div className="mt-1">
								<label htmlFor="first_brewed">
									first_brewed
									<input
										value={this.state.first_brewed}
										onChange={this._handleChange}
										type="text"
										className="form-control"
										id="first_brewed"
										name="first_brewed"
									/>
								</label>
							</div>
							<div className="mt-1">
								<label htmlFor="brewers_tips">
									brewers_tips
									<input
										value={this.state.brewers_tips}
										onChange={this._handleChange}
										type="text"
										className="form-control"
										id="brewers_tips"
										name="brewers_tips"
									/>
								</label>
							</div>
							<div className="mt-1">
								<label htmlFor="attenuation_level">
									attenuation_level
									<input
										value={this.state.attenuation_level}
										onChange={this._handleChange}
										type="text"
										className="form-control"
										id="attenuation_level"
										name="attenuation_level"
									/>
								</label>
							</div>
							<label htmlFor="contributed_by">
								contributed_by
								<input
									value={this.state.contributed_by}
									onChange={this._handleChange}
									type="text"
									className="form-control"
									id="contributed_by"
									name="contributed_by"
								/>
							</label>
							<div className="mt-3">
								<button className="btn btn-primary">Add New</button>
							</div>
						</div>
					</form>
				</div>
			);
		} else {
			form = (
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Julio_Iglesias09.jpg/220px-Julio_Iglesias09.jpg"
					alt=""
				/>
			);
		}
		return <div>{form}</div>;
	}

	_submit = e => {
		e.preventDefault();
		const data = this.state;

		axios
			.post("https://ironbeer-api.herokuapp.com/beers/new", data)
			.then(res => {
				this.setState({
					status: true
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	_handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
}

export default NewBeer;