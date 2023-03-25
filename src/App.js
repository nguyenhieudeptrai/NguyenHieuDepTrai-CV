import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from 'screens/home';
import Minigame from 'screens/minigame';
import AppleDropdown from 'screens/minigame/AppleDropdown';
import BubbleShooter from 'screens/minigame/BubbleShooter';
import LuckyDropdown from 'screens/minigame/LuckyDropdown';
import PictureMatching from 'screens/minigame/PictureMatching';
import SlidingPuzzle from 'screens/minigame/SlidingPuzzle';
import WaterDropdown from 'screens/minigame/WaterDropdown';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/minigame" >
          <Route path="" element={<Minigame />} />
          <Route path='apple-dropdown' element={<AppleDropdown />} />
          <Route path='bubble-shooter' element={<BubbleShooter />} />
          <Route path='lucky-dropdown' element={<LuckyDropdown />} />
          <Route path='sliding-puzzle' element={<SlidingPuzzle />} />
          <Route path='picture-matching' element={<PictureMatching />} />
          <Route path='water-dropdown' element={<WaterDropdown />} />
          <Route path='*' element={<Navigate to="/minigame" replace />} />
        </Route>
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
