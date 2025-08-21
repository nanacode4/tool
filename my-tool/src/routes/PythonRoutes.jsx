import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PythonLearn from './../pages/PythonLearn/PythonLearn';
import Intro from './../pages/PythonLearn/topics/Intro';
import Variables from './../pages/PythonLearn/topics/Variables';
import DataTypes from './../pages/PythonLearn/topics/Datatypes';
import Numbers from './../pages/PythonLearn/topics/Numbers';
import Strings from './../pages/PythonLearn/topics/Strings';
import Booleans from './../pages/PythonLearn/topics/Booleans';
import Operators from './../pages/PythonLearn/topics/Operators';
import Lists from './../pages/PythonLearn/topics/Lists';
import Tuples from './../pages/PythonLearn/topics/Tuples';
import Sets from './../pages/PythonLearn/topics/Sets';
import Dictionaries from './../pages/PythonLearn/topics/Dictionaries';
import IfElse from './../pages/PythonLearn/topics/IfElse';
import WhileLoop from './../pages/PythonLearn/topics/WhileLoop';
import ForLoop from './../pages/PythonLearn/topics/ForLoop';
import Functions from './../pages/PythonLearn/topics/Functions';

const PythonRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PythonLearn />} />
      <Route path="intro" element={<Intro />} />
      <Route path="variables" element={<Variables />} />
      <Route path="datatypes" element={<DataTypes />} />
      <Route path="numbers" element={<Numbers />} />
      <Route path="strings" element={<Strings />} />
      <Route path="booleans" element={<Booleans />} />
      <Route path="operators" element={<Operators />} />
      <Route path="lists" element={<Lists />} />
      <Route path="tuples" element={<Tuples />} />
      <Route path="sets" element={<Sets />} />
      <Route path="dictionaries" element={<Dictionaries />} />
      <Route path="ifelse" element={<IfElse />} />
      <Route path="while" element={<WhileLoop />} />
      <Route path="for" element={<ForLoop />} />
      <Route path="functions" element={<Functions />} />
    </Routes>
  );
};

export default PythonRoutes;
