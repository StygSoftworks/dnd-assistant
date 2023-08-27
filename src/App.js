import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Weapons from './components/Weapons';
import WeaponForm from './components/WeaponForm';
import WeaponDetails from './components/WeaponDetails';

import Races from './components/Races';

import Templates from './components/Templates';

import {
	CharacterForm,
	Characters,
	ClassDetails,
	Classes,
	Home,
	Navigation
} from './components';
import {
	AlignmentProvider,
	ClassesProvider,
	CharactersProvider,
	RacesProvider,
	TemplatesProvider,
	WeaponsProvider
} from './context';

function App() {
    return (
        <AlignmentProvider>
        <RacesProvider>
            <CharactersProvider>
                <WeaponsProvider>
                  <TemplatesProvider>
                    <ClassesProvider> {/* Wrap the whole App in ClassesProvider */}
                        <Router>
                            <div style={
                                {
                                    paddingBottom: '65px',
                                    minHeight: '100vh',
                                    position: 'relative'
                                }
                            }>
                                <Routes>
                                    <Route path="/"
                                        element={<Home/>}/>
                                    <Route path="/weapons"
                                        element={<Weapons/>}/>
                                    <Route path="/add-weapon"
                                        element={<WeaponForm/>}/>
                                    <Route path="/details-weapon/:name"
                                        element={<WeaponDetails/>}/>
                                    <Route path="/add-weapon/:wepLookupName"
                                        element={<WeaponForm/>}/>
                                    <Route path="/classes"
                                        element={<Classes/>}/>
                                    <Route path="/details-class/:name"
                                        element={<ClassDetails/>}/>

                                    <Route path="/characters"
                                        element={<Characters/>}/>
                                    <Route path="/add-character"
                                        element={<CharacterForm/>}/>

                                    <Route path="/races"
                                        element={<Races/>}/>

                                    <Route path="/templates"
                                        element={<Templates/>}/>

                                </Routes>
                                <Navigation/>
                            </div>
                        </Router>
                    </ClassesProvider>
                    </TemplatesProvider>
                </WeaponsProvider>
            </CharactersProvider>
        </RacesProvider>
        </AlignmentProvider>
    );
}

export default App;
