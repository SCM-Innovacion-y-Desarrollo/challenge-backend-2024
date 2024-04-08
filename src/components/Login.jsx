import { LoadingButton } from "@mui/lab"
import { Box, Divider, TextField, Typography } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import WindowIcon from '@mui/icons-material/Window';
import { useContext, useState } from "react";
import DarkLogo from '../assets/DarkLogo.png'
import { grey } from "@mui/material/colors";
import { 
    logging, 
    validatePassword, 
	validateUsername
} from "../utils/Login";
import { useTranslation } from "react-i18next";
import { GlobalContext } from "../GlobalContext";


const getBackground = (theme) => {
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

	switch(theme){
		case 'light':
			return isMobile ? 'transparent' : grey[50]
		case 'dark':
			return isMobile ? 'transparent' : grey[900]
		default:
			return 'transparent'
	}
}

const getBorder = (theme) => {
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

	switch(theme){
		case 'light':
			return isMobile ? 'none' : '1px solid rgba(0, 0, 0, 0.12)'
		case 'dark':
			return isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.12)'
		default:
			return 'none'
	}

}

export const Login = ({redirect}) => {
	const { t } = useTranslation()

	const { setAuthenticated } = useContext(GlobalContext)
	
	const [user, setUser] = useState({ value: '', error: false, helperText: ''})
	const [password, setPassword] = useState({value: '', error: false, helperText: ''})

	const [loading, setLoading] = useState(false)
	

	return (
		<>
			<Box 
				sx={{
					width: 400, 
					padding: 7, 
					borderRadius: 5, 
					border: (theme) => getBorder(theme.palette.mode),
					background: (theme) => getBackground(theme.palette.mode),
				}}
			>
				<form 
					onSubmit={(event) => 
						logging(event, setLoading, user, password)
						.then(() => {
							setAuthenticated(true)
						})
						.catch(() => {
							setAuthenticated(false)
						})
						.finally(() => {
							setLoading(false)
						})
					}>
					<center>
						<img
							src={DarkLogo}
							alt='logo-app'
							height={50}
							width={180}
							style={{
								marginTop: 20, 
								marginBottom: 40, 
							}}
						/>
					</center>

					<TextField
						label={t('sign_on.form.user')}
						type="text"
						variant="outlined"
						fullWidth
						value={user.value}
						onChange={(event) => {
							if(validateUsername(event.target.value)){
								setUser({
									value: event.target.value, 
									error: false, 
									helperText: ''
								})
							}else{
								setUser({
									value: event.target.value, 
									error: true, 
									helperText: event.target.value ? t('sign_on.form.invalid_user') : t('sign_on.form.empty_user')
								})
							}
						}}
						error={user.error}
						helperText={user.helperText}
					/>

					<TextField
						sx={{mt: 2}}
						type="password"
						label={t('sign_on.form.password')}
						variant="outlined"
						fullWidth
						value={password.value}
						onChange={(event) => {
							if(validatePassword(event.target.value)){
								setPassword({
									value: event.target.value, 
									error: false, 
									helperText: ''
								})

							}else{
								setPassword({
									value: event.target.value, 
									error: true, 
									helperText: event.target.value ? t('sign_on.form.invalid_password') : t('sign_on.form.empty_password')
								})
							}
						}}
						error={password.error}
						helperText={password.helperText}
					/>

					<LoadingButton
						sx={{mt: 3, mb: 3, height: 50}}
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						loading={loading}
						disableElevation
						disabled={user.error || password.error}
					>
						{ t('sign_on.form.sign_on') }
					</LoadingButton>

					<Divider> 
						<Typography>{ t('sign_on.form.or') }</Typography> 
					</Divider>

					<LoadingButton
						sx={{mt: 3, height: 50}}
						fullWidth
						variant="contained"
						color="primary"
						loading={false}
						disableElevation
						endIcon={<GoogleIcon />}
						disabled={true}
					>
						{ t('sign_on.form.sign_in_with') }
					</LoadingButton>

					<LoadingButton
						sx={{mt: 3, height: 50}}
						fullWidth
						variant="contained"
						color="primary"
						loading={false}
						disableElevation
						endIcon={<WindowIcon />}
						disabled={true}
					>
						{ t('sign_on.form.sign_in_with') }
					</LoadingButton>

					<Typography sx={{ mt: 4, textAlign: 'center'}}>{ t('sign_on.form.version') }: 0.0.1b</Typography>
				</form>
			</Box>
		</>
	)
}