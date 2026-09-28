import { Link } from 'react-router-dom'
import './AuthPage.css'

const pageContent = {
	userLogin: {
		kind: 'login',
		audience: 'user',
		eyebrow: 'YOUR NEXT FAVORITE BITE',
		title: 'Welcome back',
		description: 'Sign in to pick up where your cravings left off.',
		fields: [
			{ label: 'Email address', name: 'email', type: 'email', placeholder: 'you@example.com' },
			{ label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password' },
		],
		button: 'Sign in',
		alternateText: 'New to CRAVIO?',
		alternateLabel: 'Create an account',
		alternatePath: '/user/register',
	},
	userRegister: {
		kind: 'register',
		audience: 'user',
		eyebrow: 'GOOD FOOD, GOOD FINDS',
		title: 'Create your account',
		description: 'Save the spots and dishes you can’t wait to try.',
		fields: [
			{ label: 'Your name', name: 'name', type: 'text', placeholder: 'Alex Morgan' },
			{ label: 'Email address', name: 'email', type: 'email', placeholder: 'you@example.com' },
			{ label: 'Password', name: 'password', type: 'password', placeholder: 'Create a password' },
		],
		button: 'Create account',
		alternateText: 'Already have an account?',
		alternateLabel: 'Sign in',
		alternatePath: '/user/login',
	},
	partnerLogin: {
		kind: 'login',
		audience: 'food-partner',
		eyebrow: 'FOR FOOD PARTNERS',
		title: 'Welcome back',
		description: 'Sign in to share what’s cooking at your place.',
		fields: [
			{ label: 'Work email', name: 'email', type: 'email', placeholder: 'you@restaurant.com' },
			{ label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password' },
		],
		button: 'Sign in',
		alternateText: 'New to CRAVIO?',
		alternateLabel: 'Register your business',
		alternatePath: '/food-partner/register',
	},
	partnerRegister: {
		kind: 'register',
		audience: 'food-partner',
		eyebrow: 'BRING YOUR MENU TO LIFE',
		title: 'Join CRAVIO',
		description: 'Help more people discover the food you love to make.',
		fields: [
			{ label: 'Business name', name: 'businessName', type: 'text', placeholder: 'Your restaurant' },
			{ label: 'Contact name', name: 'contactName', type: 'text', placeholder: 'Alex Morgan' },
			{ label: 'Work email', name: 'email', type: 'email', placeholder: 'you@restaurant.com' },
			{ label: 'Password', name: 'password', type: 'password', placeholder: 'Create a password' },
		],
		button: 'Create partner account',
		alternateText: 'Already a partner?',
		alternateLabel: 'Sign in',
		alternatePath: '/food-partner/login',
	},
}

const audienceLinks = [
	{ label: 'Food lover', login: '/user/login', register: '/user/register' },
	{ label: 'Food partner', login: '/food-partner/login', register: '/food-partner/register' },
]

function AuthPage({ page }) {
	const content = pageContent[page]
	const isPartner = content.audience === 'food-partner'

	return (
		<main className="auth-shell">
			<header className="auth-header">
				<Link className="auth-brand" to="/" aria-label="CRAVIO home">
					<span className="auth-brand-mark" aria-hidden="true">C</span>
					<span>CRAVIO</span>
				</Link>
				<Link
					className="auth-header-link"
					to={isPartner ? '/user/login' : '/food-partner/login'}
				>
					{isPartner ? 'Looking for great food?' : 'Are you a food partner?'}
					<span>{isPartner ? 'Explore as a guest' : 'Join us'}</span>
				</Link>
			</header>

			<section className={`auth-card${content.fields.length > 3 ? ' auth-card--compact' : ''}`}>
				<div className="auth-intro">
					<span className="auth-eyebrow">{content.eyebrow}</span>
					<h1>{content.title}</h1>
					<p>{content.description}</p>
				</div>

				<nav className="auth-audience" aria-label="Account type">
					{audienceLinks.map(({ label, login, register }) => (
						<Link
							key={label}
							className={isPartner ? (label === 'Food partner' ? 'is-active' : '') : (label === 'Food lover' ? 'is-active' : '')}
							to={content.kind === 'login' ? login : register}
							aria-current={
								(isPartner && label === 'Food partner') || (!isPartner && label === 'Food lover')
									? 'page'
									: undefined
							}
						>
							{label}
						</Link>
					))}
				</nav>

				<form className="auth-form">
					{content.fields.map((field) => (
						<div className="auth-field" key={field.name}>
							<label htmlFor={`${page}-${field.name}`}>{field.label}</label>
							<input
								autoComplete={field.name === 'password' ? (content.kind === 'login' ? 'current-password' : 'new-password') : field.name === 'email' ? 'email' : 'name'}
								id={`${page}-${field.name}`}
								name={field.name}
								placeholder={field.placeholder}
								type={field.type}
							/>
						</div>
					))}
					<button className="auth-submit" type="button">{content.button}</button>
				</form>

				<p className="auth-alternate">
					{content.alternateText} <Link to={content.alternatePath}>{content.alternateLabel}</Link>
				</p>
			</section>

			<footer className="auth-footer">Made for the love of good food.</footer>
		</main>
	)
}

export function UserLogin() {
	return <AuthPage page="userLogin" />
}

export function UserRegister() {
	return <AuthPage page="userRegister" />
}

export function FoodPartnerLogin() {
	return <AuthPage page="partnerLogin" />
}

export function FoodPartnerRegister() {
	return <AuthPage page="partnerRegister" />
}
