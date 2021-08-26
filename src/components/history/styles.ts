import styled from 'styled-components';

export const StyledHistory = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 10px;
	margin-bottom: 20px;
	& > div {
		overflow-y:auto;
		flex-grow: 1;
		max-height: 40vh;
		border: 1px solid #c5c7c8;
		border-radius: 8px;
		background: white;
	}
	& h2 {
		margin-top: 0;
		margin-bottom: 10px;
	}
`;

export const StyledHistoryItem = styled.div`
	border-bottom: 1px solid #c5c7c8;
	padding: 15px;
	&:last-child {
		border-bottom: none;
	}
	& div {
		line-height: 20px;
		font-weight: 600;
		& span {
			font-weight: 500;
		}
	}
`;
