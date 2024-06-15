import {WelcomeView} from './WelcomeView.tsx';
import {useEffect} from 'react';
import {useUser} from '@clerk/clerk-react';
import {useSaveUserData} from '../hooks/useSaveUserData.ts';
import {useAppDispatch, useAppSelector} from '../store/store.ts';
import {selectView, updateView} from '../store/appReducer.ts';
import {SelectCommutingPreferencesView} from './SelectCommutingPreferencesView.tsx';
import {WhenYouAreGoingView} from "./WhenYouAreGoingView.tsx";
import {OnboardingView, ViewConfig} from "../components/OnboardingView.tsx";

export const RootView = () => {
    const {user} = useUser();
    const saveUserData = useSaveUserData();
    const view = useAppSelector(selectView);
    const dispatch = useAppDispatch();

    useEffect(() => {
        saveUserData(user);
    }, []);

    const getView = () => {
        switch (view) {
            case 'WELCOME':
                return <WelcomeView></WelcomeView>;
            case 'SELECT_COMMUTING_PREFERENCES':
                return <SelectCommutingPreferencesView></SelectCommutingPreferencesView>;
            case 'WHEN_YOU_ARE_GOING':
                return <WhenYouAreGoingView></WhenYouAreGoingView>;
            default:
                return '';
        }
    };

    const configBasedOnView = (): ViewConfig => {
        switch (view) {
            case 'WELCOME':
                return {
                    onContinueClick: () => {
                        dispatch(updateView('SELECT_COMMUTING_PREFERENCES'))
                    }
                }
            case 'SELECT_COMMUTING_PREFERENCES':
                return {
                    onContinueClick: () => {
                        dispatch(updateView('WHEN_YOU_ARE_GOING'))
                    }
                }
            case 'WHEN_YOU_ARE_GOING':
                return {
                    onContinueClick: () => {
                        dispatch(updateView('WHEN_YOU_ARE_GOING'))
                    }
                }
        }
    }

    return <div className="max-w-lg flex justify-stretch items-stretch">
        <OnboardingView config={configBasedOnView()}>
            {getView()}
        </OnboardingView>
    </div>;
};
