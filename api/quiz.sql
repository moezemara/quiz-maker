-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 04, 2021 at 12:26 AM
-- Server version: 5.7.36-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `commands`
--

CREATE TABLE `commands` (
  `id` int(11) NOT NULL,
  `command` varchar(255) NOT NULL,
  `action` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `commands`
--

INSERT INTO `commands` (`id`, `command`, `action`) VALUES
(1, 'mcq', 'yes'),
(2, 'written', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  `questions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `auto_incerment` int(255) NOT NULL DEFAULT '1',
  `specialization` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`id`, `name`, `uuid`, `time`, `questions`, `auto_incerment`, `specialization`, `type`) VALUES
(11, 'biology-1-mcq', 'mcq-7b19-48e3', 600, '[{\"id\":\"1\",\"marks\":\"1\",\"question\":\"Darwin and Wallace\'s theory of evolution by natural selection was revolutionary because it\",\"answers\":[\"was the first theory to refute the ideas of special creation\",\"proved that individuals acclimated to their environment over time\",\"dismissed the idea that species are constant and emphasized the importance of variation and change in populations\",\"was the first time a biologist had proposed that species changed through time\"],\"correct\":\"3\"},{\"id\":\"2\",\"marks\":\"1\",\"question\":\"The Linnaeus classification system grouped organisms by\",\"answers\":[\"linear hierarchy of the scala naturae\",\"increasingly more general categories\",\"increasingly more complex categories\",\"environmental location\"],\"correct\":\"2\"},{\"id\":\"3\",\"marks\":\"1\",\"question\":\"Fossils found in strata reveal that\",\"answers\":[\"older strata carry fossils that differ greatly from living organisms\",\"geologic changes occur quickly on Earth\",\"unused body parts decrease in size\",\"innate drive to complexity of life\"],\"correct\":\"1\"},{\"id\":\"4\",\"marks\":\"1\",\"question\":\"Prior to the work of Lyell and Darwin, the prevailing belief was that Earth is\",\"answers\":[\"a few thousand years old, and populations are unchanging\",\"a few thousand years old, and populations gradually change\",\" millions of years old, and populations rapidly change\",\" millions of years old, and populations are unchanging\"],\"correct\":\"1\"},{\"id\":\"5\",\"marks\":\"1\",\"question\":\"Which of the following statements best explains why modification or change in an organ or tissue during the lifetime of an individual is not inherited?\",\"answers\":[\"Characteristics acquired during an organism\'s life are generally not passed on through genes\",\"Spontaneous mutations can result in the appearance of new traits\",\"Only favorable adaptations have survival value\",\"Disuse of an organ may lead to its eventual disappearance\"],\"correct\":\"1\"}]', 6, 'biology', 'mcq'),
(12, 'biology-2-mcq', 'mcq-117f-4745', 600, '[{\"id\":\"1\",\"marks\":\"1\",\"question\":\"When Cuvier considered the fossils found in the vicinity of Paris, he concluded that the extinction of species\",\"answers\":[\"does not occur, but evolution does occur\",\"and the evolution of species both occur\",\"and the evolution of species do not occur\",\"occurs, but that there is no evolution\"],\"correct\":\"4\"},{\"id\":\"2\",\"marks\":\"1\",\"question\":\"For which one of the following observations were both Lamarck\'s hypothesis and Darwin\'s hypothesis in complete agreement?\",\"answers\":[\"Use and disuse of organs determines their size in progeny\",\"Gradual evolutionary change explains why organisms are well-suited to their environments\",\"Acquired characteristics are inherited\",\"More complex species are descended from less complex species\"],\"correct\":\"2\"},{\"id\":\"3\",\"marks\":\"1\",\"question\":\"Which one of the following statements best defines artificial selection?\",\"answers\":[\"Process that occurs when individuals inherit traits that enable them to survive and reproduce\",\"Process where humans decide which plants and/or animals will not breed\",\"Process of human directed breeding aimed to produce selective traits in selected species\",\"Process that favors beneficial mutations\"],\"correct\":\"3\"},{\"id\":\"4\",\"marks\":\"1\",\"question\":\"After the drought of 1977, researchers hypothesized that on the Galápagos Island Daphne Major, medium ground finches with large, deep beaks survived better than those with smaller beaks because they could more easily crack and eat the tough Tribulus cistoides fruits. A tourist company sets up reliable feeding stations with a variety of bird seeds (different types and sizes) so that tourists can get a better look at the finches. Which of these events is now most likely to occur to finch beaks on this island?\",\"answers\":[\"evolution of yet larger, deeper beaks over time, until all birds have relatively large, deep beaks\",\"evolution of smaller, pointier beaks over time, until all birds have relatively small, pointy beaks\",\"increased variation in beak size and shape over time\",\"no change in beak size and shape over time\"],\"correct\":\"3\"},{\"id\":\"5\",\"marks\":\"1\",\"question\":\"Darwin used the phrase \\\"descent with modification\\\" to explain\",\"answers\":[\"unity of life\",\"descent of all organisms from a single, ancient ancestor\",\"that habitat differences stimulate change in organisms\",\"evolution of the unity and diversity of life\"],\"correct\":\"4\"}]', 6, 'biology', 'mcq'),
(13, 'biology-1-written', 'written-7ed8-4f09', 600, '[{\"id\":\"1\",\"marks\":\"1\",\"question\":\"Biologically important molecules are essential in several anabolic and catabolic functions in any living organism. Mention two functions, one that is anabolic and another that is catabolic, for each one of the four macromolecules (carbohydrates, lipids, proteins and nucleic acids) and give a short account on how they are involved in these functions.\"},{\"id\":\"2\",\"marks\":\"1\",\"question\":\"Heterotrophs are living organisms that get their dietary needs of macromolecules through food. Explain how this food is digested into its simple building blocks (monomers) during digestion and mention some examples of the enzymes involved in the process.\"}]', 3, 'biology', 'written'),
(14, 'biology-2-written', 'written-fb3c-4f93', 600, '[{\"id\":\"1\",\"marks\":\"1\",\"question\":\"Starch and Cellulose are two examples of polysaccharides that are synthesized in plant cells and are used in heterotrophs to be digested, releasing glucose that is used in cellular respiration. However, unlike starch, animals need the assistance of some gut bacteria to digest cellulose and release glucose. Mention the difference between starch and cellulose that makes one digestible and the other indigestible, and how bacteria are able to digest cellulose, but animals cannot.\"},{\"id\":\"2\",\"marks\":\"1\",\"question\":\"Design an experiment to test the effect of the type/color of used monochromatic light on the rate of Spirogyra photosynthesis. Mention the experimental settings including (1) the experimental groups and control groups, (2) dependent and independent variables, and (3) state what you expect to observe from your experimental design.\"}]', 3, 'biology', 'written'),
(15, 'project management-1-mcq', 'mcq-20b1-4b6e', 600, '[{\"id\":\"1\",\"marks\":\"1\",\"question\":\"Smart objectives are\",\"answers\":[\"Clear, continuous, could be done, caring, and correct\",\"Segmented, measurable, available, retainable, and tidy\",\"Specific, measurable, attainable, realistic, and time bounded\",\"None of the above\"],\"correct\":\"3\"},{\"id\":\"2\",\"marks\":\"1\",\"question\":\"A project team is discussing the benefits and drawbacks of working on projects within their organization now that it has become project oriented. They can agree on many advantages for the team and for the organization, but also agree that there are some drawbacks relative to the strong matrix structure the organization used to have. In a project-oriented organization, the project team:\",\"answers\":[\"Reports to many bosses\",\"Has no loyalty to the project\",\"Reports to the functional manager\",\"Will not always have a “home”\"],\"correct\":\"4\"},{\"id\":\"3\",\"marks\":\"1\",\"question\":\"Which of the following is a characteristic of project management processes?\",\"answers\":[\"Iterative\",\"Unique\",\"Unnecessary\",\"Standardized\"],\"correct\":\"1\"},{\"id\":\"4\",\"marks\":\"1\",\"question\":\"A project is plagued by requested changes to the project charter. Who has the primary responsibility to decide if these changes are necessary?\",\"answers\":[\"The project manager\",\"The project teams\",\"The sponsor\",\"The stakeholders\"],\"correct\":\"2\"},{\"id\":\"5\",\"marks\":\"1\",\"question\":\"The project manager is working to clearly describe the level of involvement expected from everyone on the project in order to prevent rework, conflict, and coordination problems. Which of the following best describes the project manager’s efforts?\",\"answers\":[\"Develop Project Management Plan and Plan Quality Management\", \"Manage Stakeholder Engagement and Direct and Manage Project Work\",\"Validate Scope and Control Quality\",\"Identify Risks and Develop Project Team\"],\"correct\":\"1\"}]', 6, 'project management', 'mcq'),
(16, 'project management-2-mcq', 'mcq-36f5-4014', 600, '[{\"id\":\"1\",\"marks\":\"1\",\"question\":\"A project manager does not have much time to spend on planning before the mandatory start date arrives. He therefore wants to move through planning as effectively as possible. What advice would you offer?\",\"answers\":[\"Make sure you have a signed project charter and then start the WBS.\",\"Create an activity list before creating a network diagram\",\"Document all the known risks before you document the high-level assumptions\",\"Finalize the quality management plan before you determine quality metrics\"],\"correct\":\"2\"},{\"id\":\"2\",\"marks\":\"1\",\"question\":\"A project manager does not have much time to spend on planning before the mandatory start date arrives. He therefore wants to move through planning as effectively as possible. What advice would you offer?\",\"answers\":[\"What\",\"When\",\"Where\",\"Why\"],\"correct\":\"3\"},{\"id\":\"3\",\"marks\":\"1\",\"question\":\"One of your team members informs you that he does not know which of the many projects he is working on is the most important. Who should determine the priorities between projects in a company?\",\"answers\":[\"The project manager\",\"The project management team\",\"The project management office (PMO)\",\"The project’s team\"],\"correct\":\"3\"},{\"id\":\"4\",\"marks\":\"1\",\"question\":\" The project team has just completed the initial project schedule and budget the next thing to do is to:\",\"answers\":[\"Identify risks\",\"Begin iterations\",\"Determine communications requirements\",\"Create a bar (Gantt) chart\"],\"correct\":\"3\"},{\"id\":\"5\",\"marks\":\"1\",\"question\":\"A team member is not performing well on the project because they are inexperienced in system development work. There is no one else available who is better qualified to do the work. What is the best solution for the project manager?\",\"answers\":[\"Consult with the functional manager to determine project completion incentives for the team member.\",\"Obtain a new resource more skilled in development work.\",\"Arrange for the team member to get training.\",\"Allocate some of the project schedule reserve.\"],\"correct\":\"3\"}]', 6, 'project management', 'mcq'),
(17, 'project management-1-written', 'written-3c88-4786', 600, '[{\"id\":\"1\",\"marks\":\"1\",\"question\":\"To obtain support for the project throughout the performing organization, it\'s best if the project manager, Explain why:\"},{\"id\":\"2\",\"marks\":\"1\",\"question\":\"What does a resource histogram show that a responsibility assignment matrix does not?\"}]', 3, 'project management', 'written'),
(18, 'project management-2-written', 'written-4da2-4f77', 600, '[{\"id\":\"1\",\"marks\":\"1\",\"question\":\"A project has faced major difficulties in the quality of its deliverables. Management now states that quality is the most important project constraint. If another problem with quality were to occur, what would be the best thing for the project manager to do?\"},{\"id\":\"2\",\"marks\":\"1\",\"question\":\"As part of closing a cost-reimbursement contract on a project, what must the buyer to remember to do?\"}]', 3, 'project management', 'written');

-- --------------------------------------------------------

--
-- Table structure for table `specializations`
--

CREATE TABLE `specializations` (
  `id` int(11) NOT NULL,
  `specialization` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `specializations`
--

INSERT INTO `specializations` (`id`, `specialization`) VALUES
(35, 'biology'),
(40, 'project management');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `emirates_id` varchar(255) NOT NULL,
  `specialization` varchar(255) NOT NULL,
  `student_uuid` varchar(255) NOT NULL,
  `mcq_taken` varchar(255) NOT NULL DEFAULT 'no',
  `mcq_uuid` varchar(255) DEFAULT NULL,
  `mcq_answers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `mcq_grade` varchar(255) DEFAULT NULL,
  `mcq_start` bigint(20) DEFAULT NULL,
  `mcq_end` bigint(20) DEFAULT NULL,
  `written_taken` varchar(255) NOT NULL DEFAULT 'no',
  `written_uuid` varchar(255) DEFAULT NULL,
  `written_answers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `written_grade` varchar(255) DEFAULT NULL,
  `written_start` bigint(20) DEFAULT NULL,
  `written_end` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `phone`, `emirates_id`, `specialization`, `student_uuid`, `mcq_taken`, `mcq_uuid`, `mcq_answers`, `mcq_grade`, `mcq_start`, `mcq_end`, `written_taken`, `written_uuid`, `written_answers`, `written_grade`, `written_start`, `written_end`) VALUES
(38, 'Mohamed Ezzat', 'moezemara@gmail.com', '01097463865', '123456789', 'biology', 'student-ba84-4768', 'yes', 'mcq-117f-4745', '[{\"id\":\"1\",\"answer\":\"4\"},{\"id\":\"2\",\"answer\":\"2\"},{\"id\":\"3\",\"answer\":\"3\"},{\"id\":\"4\",\"answer\":\"3\"},{\"id\":\"5\",\"answer\":\"4\"}]', '5', 1637485451, 1637485676, 'yes', 'written-7ed8-4f09', '[{\"id\":\"1\",\"answer\":\"Test 1\"},{\"id\":\"2\",\"answer\":\"test 2\"}]', NULL, 1637486070, 1637486118),
(40, 'Mohamed Ezzat', 'moezemara1@gmail.com', '01097463865', '1234567891', 'project management', 'student-efdf-4676', 'yes', 'mcq-20b1-4b6e', '[{\"id\":\"1\",\"answer\":\"3\"},{\"id\":\"2\",\"answer\":\"3\"},{\"id\":\"3\",\"answer\":\"2\"},{\"id\":\"4\",\"answer\":\"1\"},{\"id\":\"5\",\"answer\":\"2\"}]', '1', 1637487337, 1637487535, 'yes', 'written-3c88-4786', '[{\"id\":\"1\",\"answer\":\"test test test\"},{\"id\":\"2\",\"answer\":\"test test test\"}]', NULL, 1637487287, 1637487312),
(41, 'Mohamed Ezzat', 'moezemaraaa@gmail.com', '01097463865', '784-1972-2863615-1', '', 'student-a716-4630', 'no', NULL, '[]', NULL, NULL, NULL, 'no', NULL, '[]', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userkey` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `userkey`) VALUES
(1, 'admin', 'admin', 'f6c5aedc-0c23-4722-917b-0acd95bed98d');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `commands`
--
ALTER TABLE `commands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specializations`
--
ALTER TABLE `specializations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `specialization` (`specialization`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `emirates_id` (`emirates_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `commands`
--
ALTER TABLE `commands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `specializations`
--
ALTER TABLE `specializations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
