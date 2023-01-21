import { domHelpers } from '@chpokify/helpers/dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tour from 'reactour';
import shortid from 'shortid';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiSelectors } from '@Redux/domains/ui/selectors';
import { usersAsyncActions } from '@Redux/domains/users/asyncActions';
import { useAppDispatch } from '@Redux/hooks';

import { coreHelpers } from '@components/domains/core/helpers';
import { DATA_TEST_ID } from '@components/domains/core/types';
import { ONBOARDING_TYPE } from '@components/domains/marketing/types';
import { useCanMakeOnboarding } from '@components/domains/space/onboarding/hooks';
import { SPACE_ONBOARDING_STEP_ID } from '@components/domains/space/onboarding/types';

import { TRANS } from '@components/utils/types';

import { getTheme } from '@styles/theme';

import styles from './SpaceOnboardingContent.module.css';

const getStepSelector = (id: SPACE_ONBOARDING_STEP_ID) => `[data-tut-space="${id}"]`;

const NEXT_BTN_SELECTOR = '[data-tour-elem="right-arrow"]';

const enableBody = (target: HTMLElement) => enableBodyScroll(target);
const disableBody = (target: HTMLElement) => disableBodyScroll(target);

const SpaceOnboardingContent = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const themeType = useSelector(authSelectors.getCurrUserThemeType);
  const theme = getTheme(themeType);

  const currUserId = useSelector(authSelectors.getCurrUserId);

  const canMakeOnboarding = useCanMakeOnboarding();

  const isOpen = useSelector(uiSelectors.getIsSpaceOnboardingOpen);
  const isUserHasOnboarding = useSelector(authSelectors.getShowSpaceOnboarding);
  const shouldShow = canMakeOnboarding && isUserHasOnboarding;

  const [step, setStep] = useState<number>(0);
  const [needUpdate, setNeedUpdate] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      dispatch(uiActions.modalPreventCloseSet(true));
    } else {
      dispatch(uiActions.modalPreventCloseSet(false));
    }
  }, [isOpen]);

  useEffect(() => {
    if (shouldShow) {
      dispatch(uiActions.onboardingSet({
        type: ONBOARDING_TYPE.SPACE,
      }));
    }
  }, [shouldShow]);

  const handleNextStep = () => {
    setStep((prevVal) => prevVal + 1);
  };

  const handlePrevStep = () => {
    setStep((prevVal) => prevVal - 1);
  };

  const handleClose = async () => {
    if (!currUserId) {
      return;
    }

    setStep(0);
    dispatch(uiActions.onboardingSet(null));

    if (isUserHasOnboarding) {
      await dispatch(usersAsyncActions.updateOnboarding(
        currUserId,
        {
          showSpaceOnboarding: false,
        }
      ));
    }
  };

  const getStepContent = (stepNum: number) => t(`spaceOnboarding.step.${stepNum - 1}.content`);

  const steps = [
    {
      index: 1,
      content: getStepContent(1),
      hidePrevBtn: true,
    },
    {
      index: 2,
      selector: getStepSelector(SPACE_ONBOARDING_STEP_ID.PARTICIPANTS),
      content: getStepContent(2),
      hidePrevBtn: true,
    },
    {
      index: 3,
      selector: getStepSelector(SPACE_ONBOARDING_STEP_ID.INVITE_BTN),
      content: getStepContent(3),
      hidePrevBtn: true,
      hideNextBtn: true,
      stepInteraction: true,
      action: (node: HTMLElement) => {
        node.onclick = () => {
          domHelpers.makeActionWhenAppear(
            getStepSelector(SPACE_ONBOARDING_STEP_ID.INVITE_MODAL),
            handleNextStep
          );
        };
      },
    },
    {
      index: 4,
      selector: getStepSelector(SPACE_ONBOARDING_STEP_ID.INVITE_MODAL),
      content: getStepContent(4),
      hidePrevBtn: true,
      stepInteraction: true,
      canFocus: true,
      action: () => {
        const nextBtnEl = document.querySelector(NEXT_BTN_SELECTOR) as HTMLButtonElement;

        if (!nextBtnEl) {
          return;
        }

        nextBtnEl.onclick = (event) => {
          event.stopImmediatePropagation();
          event.preventDefault();

          dispatch(uiActions.modalHide());
          handleNextStep();

          nextBtnEl.onclick = null;
        };
      },
    },
    {
      index: 5,
      selector: getStepSelector(SPACE_ONBOARDING_STEP_ID.TEAMS),
      content: getStepContent(5),
      hidePrevBtn: true,
    },
    {
      index: 6,
      selector: getStepSelector(SPACE_ONBOARDING_STEP_ID.TEAM_CREATE_BTN),
      content: getStepContent(6),
      hidePrevBtn: true,
      hideNextBtn: true,
      stepInteraction: true,
      action: (node: HTMLElement) => {
        node.onclick = () => {
          domHelpers.makeActionWhenAppear(
            getStepSelector(SPACE_ONBOARDING_STEP_ID.TEAM_CREATE_MODAL),
            handleNextStep
          );
        };
      },
    },
    {
      index: 7,
      selector: getStepSelector(SPACE_ONBOARDING_STEP_ID.TEAM_CREATE_MODAL),
      content: getStepContent(7),
      hidePrevBtn: true,
      hideNextBtn: true,
      stepInteraction: true,
      canFocus: true,
      action: () => {
        domHelpers.hideElement(
          coreHelpers.getDataTestIdSelector(DATA_TEST_ID.TEAM_CREATE_MODAL_CANCEL_BTN)
        );

        domHelpers.makeActionWhenDisapear(
          getStepSelector(SPACE_ONBOARDING_STEP_ID.TEAM_CREATE_MODAL),
          handleNextStep
        );
      },
    },
    {
      index: 8,
      selector: getStepSelector(SPACE_ONBOARDING_STEP_ID.TEAM_ITEM),
      content: getStepContent(8),
      hidePrevBtn: true,
      stepInteraction: false,
      action: (node: HTMLElement) => {
        node.scrollIntoView();
        setNeedUpdate(shortid());
      },
    },
    {
      index: 9,
      selector: getStepSelector(SPACE_ONBOARDING_STEP_ID.POKER_SESSION_CREATE_BTN),
      content: getStepContent(9),
      hidePrevBtn: true,
      hideNextBtn: true,
      stepInteraction: true,
      action: (node: HTMLElement) => {
        node.scrollIntoView();
        setNeedUpdate(shortid());

        node.onclick = () => {
          domHelpers.makeActionWhenAppear(
            coreHelpers.getDataTestIdSelector(DATA_TEST_ID.POKER_SESSION_CREATE_MODAL),
            handleNextStep
          );
        };
      },
    },
    {
      index: 10,
      selector: getStepSelector(SPACE_ONBOARDING_STEP_ID.POKER_SESSION_CREATE_MODAL),
      content: getStepContent(10),
      hidePrevBtn: true,
      hideNextBtn: true,
      stepInteraction: true,
      canFocus: true,
      action: () => {
        domHelpers.hideElement(
          coreHelpers.getDataTestIdSelector(DATA_TEST_ID.POKER_SESSION_CREATE_MODAL_CANCEL_BTN)
        );

        domHelpers.makeActionWhenDisapear(
          getStepSelector(SPACE_ONBOARDING_STEP_ID.POKER_SESSION_CREATE_MODAL),
          handleNextStep
        );
      },
    },
    {
      index: 11,
      selector: getStepSelector(SPACE_ONBOARDING_STEP_ID.POKER_SESSION_TEAMS_EDIT_MODAL),
      content: getStepContent(11),
      hidePrevBtn: true,
      hideNextBtn: true,
      stepInteraction: true,
      canFocus: true,
      action: () => {
        domHelpers.hideElement(
          coreHelpers.getDataTestIdSelector(DATA_TEST_ID.POKER_SESSION_TEAMS_EDIT_MODAL_CANCEL_BTN)
        );

        domHelpers.hideElement(
          coreHelpers.getDataTestIdSelector([
            DATA_TEST_ID.POKER_SESSION_TEAMS_EDIT_MODAL,
            DATA_TEST_ID.TEAM_CREATE_BTN,
          ])
        );

        const submitBtn = document.querySelector(
          coreHelpers.getDataTestIdSelector(DATA_TEST_ID.POKER_SESSION_TEAMS_EDIT_MODAL_SUBMIT_BTN)
        ) as HTMLButtonElement;

        if (submitBtn) {
          submitBtn.onclick = handleClose;
        }
      },
    },
  ];

  const getHideNextBtn = () => (steps[step] && steps[step].hideNextBtn);
  const getHidePrevBtn = () => (steps[step] && steps[step].hidePrevBtn);
  const getDisabledFocusLock = () => (steps[step] && !!steps[step].canFocus);

  return (
    <Tour
      steps={steps}
      startAt={step}
      rounded={8}
      isOpen={isOpen}
      accentColor={theme.colors.primary.normal}
      onRequestClose={handleClose}
      nextStep={handleNextStep}
      prevStep={handlePrevStep}
      goToStep={step}
      closeWithMask={false}
      disableInteraction
      disableKeyboardNavigation
      disableDotsNavigation
      disableFocusLock={getDisabledFocusLock()}
      update={needUpdate}
      onAfterOpen={disableBody}
      onBeforeClose={enableBody}
      maskClassName={styles.mask}
      className={classnames(styles.root, {
        spaceOnboardingHideNextBtn: getHideNextBtn(),
        spaceOnboardingHidePrevBtn: getHidePrevBtn(),
      })}
    />
  );
};

export default SpaceOnboardingContent;
