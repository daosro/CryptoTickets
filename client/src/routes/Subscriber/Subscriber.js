import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { USER_ZONE_TICKETS_PATH } from "../../constants/routes";
import { Web3Context } from "../../context/Web3";
import Button from "../../core/Button";
import withConnectionRequired from "../../hocs/withConnectionRequired";

import useStyles from "./Subscriber.style";
import Loading from "../../core/Loading";
import { notify } from "../../utils/notifications";

const Subscriber = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { accounts, contracts } = useContext(Web3Context);
  const [isMembershipTokenMinted, setIsMembershipTokenMinted] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasMembershipRole, setHasMembershipRole] = useState();

  useEffect(() => {
    const checkIfTokenIsMinted = async () => {
      if (accounts?.[0] && contracts?.membership) {
        const hasCorrectRole = await contracts.membership.methods
          .hasMembershipRol(accounts?.[0])
          .call();
        setHasMembershipRole(hasCorrectRole);

        const result = await contracts.membership.methods
          .isMembershipTokenMinted(accounts?.[0])
          .call();
        setIsMembershipTokenMinted(result);
      }
    };
    checkIfTokenIsMinted();
  }, [accounts, contracts, isButtonDisabled]);

  const onMintTokenButtonClick = useCallback(async () => {
    setIsButtonDisabled(true);
    try {
      notify(
        "Processing...",
        "This process may take several minutes, please wait.",
        "info",
        10000
      );

      await contracts.membership.methods
        .mintMembershipToken()
        .send()
        .on("receipt", function () {
          notify("Congratulations!", "You are one of us now", "success", 5000);
        })
        .on("error", function (error, receipt) {
          notify("Something went wrong", error?.message, "danger", 10000);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsButtonDisabled(false);
    }
  }, [contracts]);

  const onSeeMembershipTokenButtonClick = useCallback(() => {
    navigate(USER_ZONE_TICKETS_PATH);
  }, [navigate]);

  return (
    <div className={classes.root}>
      <div className={classes.title}>CARN?? DE SOCIO</div>
      <div className={classes.text}>
        Los socios del Real Madrid son todas aquellas personas f??sicas que
        integran la entidad Real Madrid con los derechos y obligaciones
        contenidos en los Estatutos.
      </div>

      <img
        className={classes.image}
        src={process.env.PUBLIC_URL + "/assets/images/360-abono.png"}
        alt="Stadium"
      />

      {hasMembershipRole === false && (
        <div className={classes.error}>
          <div>Tu direcci??n no consta en el listado de socios del club</div>
        </div>
      )}
      {hasMembershipRole === true && isMembershipTokenMinted === false && (
        <Button
          className={classes.button}
          onClick={onMintTokenButtonClick}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? (
            <Loading height={80} width={80} />
          ) : (
            "Quiero ser Socio"
          )}
        </Button>
      )}

      {hasMembershipRole === true && isMembershipTokenMinted === true && (
        <Button
          className={classes.button}
          onClick={onSeeMembershipTokenButtonClick}
        >
          Ver mi Carn?? de Socio
        </Button>
      )}

      <div className={classes.title}>
        CONDICIONES ESPECIFICADAS EN LA TARJETA
      </div>
      <p className={classes.text}>
        Todos los socios, desde el momento en que ingresan en la entidad,
        reciben su carn?? de socio que contiene su nombre y apellidos, su
        fotograf??a, la fecha de alta como Socio en el Club y un n??mero. Este
        n??mero se asigna por estricto orden de ingreso en la entidad, de manera
        que el socio con m??s a??os de antig??edad en el club ser?? el socio n??mero
        1 y el ??ltimo socio inscrito recibir?? el n??mero m??s alto que
        correspondiera en el momento de su ingreso.
      </p>
      <p className={classes.text}>
        El carn?? de socio, con su correspondiente numeraci??n, es un documento
        oficial, personal e intransferible, que acredita la condici??n de socio,
        por lo que no es posible traspasarlo de un socio a otro ni permitir su
        uso a terceras personas.
      </p>
      <p className={classes.text}>
        Cada cierto tiempo, el club actualiza la numeraci??n de los socios,
        eliminando las bajas que se hayan producido entre el ??ltimo proceso de
        actualizaci??n y el siguiente. La ??ltima renumeraci??n se realiz?? en marzo
        de 2021, y el Club envi?? a todos los Socios un nuevo carn?? con una nueva
        numeraci??n a su domicilio. Estas campa??as peri??dicas de actualizaci??n de
        n??meros de Socio suponen no s??lo una modificaci??n en el dise??o del
        carn??, sino tambi??n un reajuste de la numeraci??n en funci??n de la
        antig??edad real de cada Socio.
      </p>
    </div>
  );
};

export default withConnectionRequired(Subscriber);
