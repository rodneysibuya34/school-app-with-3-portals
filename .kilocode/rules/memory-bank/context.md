# Active Context: Geleza Mzansi School Portal

## Current State

**Project Status**: ✅ Complete with localStorage data sharing + Primary School support + AI Assistant

Geleza Mzansi is a multi-portal school management system with 3 portals (Student, Teacher, Admin).
Now supports both Primary School (Grades 4-7) and High School (Grades 8-12).

## Recently Completed

- [x] Fixed student portal TypeScript errors (duplicate declarations)
- [x] Added localStorage integration to student portal for reading teacher-created content
- [x] Student portal now reads homework, tests, timetables, study materials, courses from localStorage
- [x] Added grade-based filtering so students see content for their specific grade
- [x] Fallback to default data when localStorage is empty
- [x] Added primary school data (Grades 4-7) for homework, tests, exam timetable, weekly timetable, study materials, and courses
- [x] Added Religious Studies and Xitsonga subjects to subject lists
- [x] Added subject field to homework and tests in teacher portal
- [x] Teacher portal grade selector now includes grades 4-7
- [x] **NEW: Geleza AI Assistant** - Added to both Student and Teacher portals
  - Student mode: Helps students understand concepts (not give answers), guides through problems
  - Teacher mode: Helps create tests (guides, not do it), identifies struggling students

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Landing page with portal selection | ✅ |
| `src/app/student/page.tsx` | Student portal - READS from localStorage | ✅ Complete |
| `src/app/teacher/page.tsx` | Teacher portal - WRITES to localStorage | ✅ Complete |
| `src/app/admin/page.tsx` | Admin portal | ✅ |
| `src/app/login/page.tsx` | Login page | ✅ |
| `src/components/AIAssistant.tsx` | AI Assistant component | ✅ New |

## Data Flow

Teacher portal saves to localStorage keys:
- `homeworkData` - Homework assignments (now includes subject)
- `testData` - Online tests (now includes subject)
- `examTimetableData` - Exam schedules
- `weeklyTimetableData` - Weekly schedule
- `studyMaterialsData` - Study materials
- `coursesData` - Course data
- `strugglingStudents` - Students flagged for support

Student portal reads from same keys and filters by student's grade and selected subjects.

## Geleza AI Features

**Student Portal:**
- Floating AI button (amber/orange theme)
- Explains concepts step-by-step without giving answers
- Uses guiding questions
- Helps with math, science, essay writing
- SA curriculum context

**Teacher Portal:**
- Floating AI button (red/orange theme)
- Guides test/quiz creation (doesn't write questions)
- Helps identify struggling students
- "Flag Student" feature for teacher to add to watch list
- Dashboard shows count of students needing support
- Red alert section on dashboard for flagged students

## Technical Details

- **Theme**: Dark stone (#1C1917) background, warm accent colors
- **Portal Colors**: Student (amber), Teacher (red), Admin (cyan)
- **Fonts**: Outfit (headings), DM Sans (body)
- **No TypeScript errors**: ✅
- **No ESLint errors**: ✅

## Supported Grades & Subjects

**Primary School (Grades 4-7)**:
- Mathematics, English Home Language, Afrikaans First Add
- Natural Sciences, Social Sciences, Life Skills

**High School (Grades 8-12)**:
- Full SA curriculum including Religious Studies, Xitsonga, IT, Consumer Studies
- Subject selection for Grade 10+ (minimum 4 subjects)

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| Mar 20, 2026 | Implemented Geleza Mzansi school portal |
| Mar 25, 2026 | Fixed student portal TypeScript errors, added localStorage integration |
| Mar 26, 2026 | Added primary school support (Grades 4-7), Religious Studies, Xitsonga |
| Mar 26, 2026 | Added Geleza AI Assistant with student/teacher modes |

## Pending Improvements

- [ ] Add real backend/database integration
- [ ] Add authentication system
