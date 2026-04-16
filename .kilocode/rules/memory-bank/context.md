# Active Context: Geleza Mzansi School Portal

## Current State

**Project Status**: ✅ Build passing with JSON file-based database

Geleza Mzansi is a multi-portal school management system with 3 portals (Student, Teacher, Admin).
Now supports both Primary School (Grades 4-7) and High School (Grades 8-12).
Using JSON file storage for Vercel compatibility (localStorage/SQLite don't work in production).

## Previously Completed

- [x] Switched from SQLite to JSON file storage for Vercel compatibility
- [x] Created `/src/db/data.js` - JSON file-based CRUD operations
- [x] Updated db-actions.ts to use new data.js
- [x] Fixed TypeScript errors in content-actions.ts and homework route
- [x] Seed file moved to backup (seed.ts.bak) - not needed for JSON approach
- [x] Build passes successfully
- [x] Fixed teacher dashboard: students now filtered by teacher's grade, combined teacher data from localStorage

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/db/data.js` | JSON file-based CRUD operations | ✅ New |
| `src/actions/db-actions.ts` | Server actions using data.js | ✅ Updated |
| `src/actions/content-actions.ts` | Content actions using data.js | ✅ Updated |
| `src/app/api/schools/route.ts` | Schools API endpoint | ✅ |
| `src/app/api/teachers/route.ts` | Teachers API endpoint | ✅ |
| `src/app/api/students/route.ts` | Students API endpoint | ✅ |
| `src/app/page.tsx` | Landing page with portal selection | ✅ |
| `src/app/student/page.tsx` | Student portal | ✅ Complete |
| `src/app/teacher/page.tsx` | Teacher portal | ✅ Complete |
| `src/app/admin/page.tsx` | Admin portal - uses API | ✅ |
| `src/app/login/page.tsx` | Login page - uses API | ✅ |
| `src/components/AIAssistant.tsx` | AI Assistant component | ✅ |

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
| Mar 26, 2026 | Added School Info section to Admin portal (contact, address) |
| Mar 26, 2026 | Added Terms & Conditions and Privacy Policy pages |

## Pending Improvements

- [ ] Add real backend/database integration
- [ ] Add authentication system
