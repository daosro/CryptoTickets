import React, { useCallback, useContext, useState } from "react";
import { Web3Context } from "../../context/Web3";
import Button from "../../core/Button";
import withConnectionRequired from "../../hocs/withConnectionRequired";

import useStyles from "./Subscriber.style";

const Subscriber = () => {
  const classes = useStyles();
  const { contract } = useContext(Web3Context);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const onClickHandler = useCallback(async () => {
    setIsButtonDisabled(true);
    try {
      const result = await contract.methods
        .mintSubscriberNFT(
          "ipfs://bafkreic3xz5cssins4ihcyoo27kcmflwmgqvpbm2stpr3xfxxnsykgkali"
        )
        .send();
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsButtonDisabled(false);
    }
  }, [contract]);

  return (
    <div className={classes.root}>
      <div className={classes.title}>CARNÉ DE SOCIO</div>
      <div className={classes.text}>
        Los socios del Real Madrid son todas aquellas personas físicas que
        integran la entidad Real Madrid con los derechos y obligaciones
        contenidos en los Estatutos.
      </div>

      <img
        className={classes.image}
        src={process.env.PUBLIC_URL + "/assets/images/360-abono.png"}
        alt="Stadium"
      />

      <Button
        className={classes.button}
        onClick={onClickHandler}
        disabled={isButtonDisabled}
      >
        Quiero ser Socio
      </Button>

      <div className={classes.title}>
        CONDICIONES ESPECIFICADAS EN LA TARJETA
      </div>
      <p className={classes.text}>
        Todos los socios, desde el momento en que ingresan en la entidad,
        reciben su carné de socio que contiene su nombre y apellidos, su
        fotografía, la fecha de alta como Socio en el Club y un número. Este
        número se asigna por estricto orden de ingreso en la entidad, de manera
        que el socio con más años de antigüedad en el club será el socio número
        1 y el último socio inscrito recibirá el número más alto que
        correspondiera en el momento de su ingreso.
      </p>
      <p className={classes.text}>
        El carné de socio, con su correspondiente numeración, es un documento
        oficial, personal e intransferible, que acredita la condición de socio,
        por lo que no es posible traspasarlo de un socio a otro ni permitir su
        uso a terceras personas.
      </p>
      <p className={classes.text}>
        Cada cierto tiempo, el club actualiza la numeración de los socios,
        eliminando las bajas que se hayan producido entre el último proceso de
        actualización y el siguiente. La última renumeración se realizó en marzo
        de 2021, y el Club envió a todos los Socios un nuevo carné con una nueva
        numeración a su domicilio. Estas campañas periódicas de actualización de
        números de Socio suponen no sólo una modificación en el diseño del
        carné, sino también un reajuste de la numeración en función de la
        antigüedad real de cada Socio.
      </p>
    </div>
  );
};

export default withConnectionRequired(Subscriber);
