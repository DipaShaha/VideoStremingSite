import React from 'react';
import {connect} from 'react-redux';
import {signIn,signOut} from '../actions';
class GoogleAuth extends React.Component{

	componentDidMount(){
		window.gapi.load('client:auth2',()=>{
			window.gapi.client.init({
				clientId:'716717151238-4k8eh7dtp7o8qs9arcqj6capvm6mdi5d.apps.googleusercontent.com',
				scope:'email'
			}).then(()=>{
				this.auth=window.gapi.auth2.getAuthInstance();
				this.onAuthCHange(this.auth.isSignedIn.get());
				this.auth.isSignedIn.listen(this.onAuthCHange);
			})
		});
	}

	onAuthCHange=(isSignedIn)=>{
		if(isSignedIn){
			this.props.signIn();
		}else{
			this.props.signOut();
		}
	}

	onSignInClick=()=>{
		this.auth.signIn();
	}

	onSignOutClick=()=>{
		this.auth.signOut();
	}


	renderAuthButton(){
	
		if(this.props.isSignedIn){
			return(
					<button className="ui red goggle button" onClick={this.onSignOutClick}>
						<i className="goggle icon" />Sign Out
					</button>
				) 
		}else{
			return(
					<button className="ui red goggle button" onClick={this.onSignInClick}>
						<i className="goggle icon" />
						Sign In With Google
					</button>
				) 
		}
	}

	render(){ 
		return(
			<div>
				{this.renderAuthButton()}
			</div>
		)}
}

const mapStateToProps=(state)=>{
	return{
		isSignedIn:state.auth.isSignedIn
	}
}
export default connect(mapStateToProps,{
	signIn,signOut
})(GoogleAuth);
