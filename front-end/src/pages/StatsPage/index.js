import { Component } from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Header from '../../componentes/Header';
import ShortenerService from '../../services/shortenerService';
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './style';
import vars from '../../configs/global';

class StatsPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            shortenedURL: {  },
            errorMessage: '',
        }

    }

    async componentDidMount(){
        const { code } = this.props.match.params;
        try{
            const service = new ShortenerService();

            const shortenedURL = await service.getStats(code);
            const parsedDate = parseISO(shortenedURL.updatedAt);
            const currentDate = new Date();
            const relativeDate = formatRelative(parsedDate, currentDate, {
                locale: ptBR,
            })    

            shortenedURL.relativeDate = relativeDate;

            this.setState({isLoading: false, shortenedURL});
        } catch(error){
            console.log(error);
            this.setState({isLoading: false, errorMessage: "Ops, a url solicitada não existe."});
        }
    }


    render(){
        const { errorMessage, shortenedURL }  = this.state;
        return (
            <Container>
                <Header>Estatísticas</Header>
                { errorMessage? 
                    (
                    <StatsContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon= "exclamation-triangle" />
                        <p className = "m-3">{ errorMessage }</p>
                        <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                    ) : (
                     <StatsContainer className="text-center">
                        <p><strong>{vars.APP_HOST + shortenedURL.code}</strong></p>
                        <p>Redireciona para: <br/>{shortenedURL.url}</p>
                        <StatsRow>
                            <StatsBox>
                                <strong>{shortenedURL.hits}</strong>
                                <StatsBoxTitle>Visitas</StatsBoxTitle>
                            </StatsBox>
                            <StatsBox>
                                <strong>{shortenedURL.relativeDate}</strong>
                                <StatsBoxTitle>Última visita</StatsBoxTitle>
                            </StatsBox>
                        </StatsRow>
                        <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                    )}
            </Container>
        )
    }
}

export default StatsPage;